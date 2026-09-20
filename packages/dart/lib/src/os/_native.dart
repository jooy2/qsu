import 'dart:convert';
import 'dart:io';

import 'package:qsu/src/os/_posix.dart' as posix;
import 'package:qsu/src/os/_windows.dart' as windows;

/// (Private) What the machine answers about itself, on the platforms that can.
///
/// Each entry asks the operating system directly, through a system call or a
/// file under `/proc`. Nothing here starts a process, so every function built on
/// it works inside a sandbox that forbids one, which is what iOS does.
///
/// Android reads the same `/proc` files as Linux and iOS answers the same system
/// calls as macOS, so the two mobile platforms are not separate implementations.
/// What differs is only what their sandbox permits.
///
/// Each one returns `null` when the platform cannot answer, leaving the caller
/// to decide what to do about it.

/// `_SC_CLK_TCK` as Linux numbers it. Only the Linux branch asks for it.
const int _clockTicksName = 2;

/// The frequency libuv reports on an Apple Silicon Mac. Apple does not publish
/// the real one, so the JavaScript package answers with this and so does this
/// one, rather than the two disagreeing about the same machine.
const int _appleSiliconMhz = 2400;

const String _linuxCpuFrequency =
    '/sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq';

const String _windowsCpuKey = r'HARDWARE\DESCRIPTION\System\CentralProcessor\0';

bool get _isDarwin => Platform.isMacOS || Platform.isIOS;

/// The physical memory in bytes, as a total and the part still available.
(int, int)? memorySize() {
  if (Platform.isWindows) {
    return windows.memoryStatus();
  }

  if (_isDarwin) {
    final int? total = posix.sysctlUnsigned('hw.memsize');
    final int? pageSize = posix.sysctlUnsigned('hw.pagesize');
    final int? free = posix.sysctlUnsigned('vm.page_free_count');
    final int? speculative = posix.sysctlUnsigned('vm.page_speculative_count');

    if (total == null ||
        pageSize == null ||
        free == null ||
        speculative == null) {
      return null;
    }

    // The mach `free_count` the JavaScript package reads counts the speculative
    // pages along with the free ones, and these two add up to exactly that.
    return (total, (free + speculative) * pageSize);
  }

  final Map<String, int> values = _meminfo();
  final int? total = values['MemTotal'];
  final int? available = values['MemAvailable'];

  return (total == null || available == null) ? null : (total, available);
}

Map<String, int> _meminfo() {
  final Map<String, int> values = <String, int>{};

  for (final String line in _lines('/proc/meminfo')) {
    final int separator = line.indexOf(':');

    if (separator < 0) {
      continue;
    }

    final String name = line.substring(0, separator);

    if (name != 'MemTotal' && name != 'MemAvailable') {
      continue;
    }

    final int? size = int.tryParse(
        line.substring(separator + 1).trim().split(RegExp(r'\s+')).first);

    if (size != null) {
      // The file writes every size in kibibytes.
      values[name] = size * 1024;
    }
  }

  return values;
}

/// The total, free and used bytes of the filesystem holding [path].
(int, int, int)? diskSpace(String path) =>
    Platform.isWindows ? windows.diskSpace(path) : posix.statvfs(path);

/// Processor time since boot, as a total and the part of it spent idle.
///
/// The units differ between platforms and mean nothing on their own. Two
/// readings a moment apart are what says how busy the processor was in between.
(int, int)? cpuTicks() {
  if (Platform.isWindows) {
    return windows.cpuTicks();
  }

  if (_isDarwin) {
    return posix.machCpuTicks();
  }

  final List<String> lines = _lines('/proc/stat');

  if (lines.isEmpty || !lines.first.startsWith('cpu ')) {
    return null;
  }

  final List<int> fields = lines.first
      .split(RegExp(r'\s+'))
      .skip(1)
      .map((String field) => int.tryParse(field) ?? -1)
      .toList();

  if (fields.length < 6 || fields.any((int field) => field < 0)) {
    return null;
  }

  // user, nice, system, idle and irq, which is the set the JavaScript package
  // counts. The time waiting on I/O and the time stolen by a hypervisor sit
  // between them in the file and are left out of both.
  final int total = fields[0] + fields[1] + fields[2] + fields[3] + fields[5];

  return (total, fields[3]);
}

/// Seconds since the machine booted.
double? systemUptime() {
  if (Platform.isWindows) {
    return windows.systemUptime();
  }

  if (_isDarwin) {
    final int? bootedAt = posix.sysctlSeconds('kern.boottime');

    if (bootedAt == null) {
      return null;
    }

    // Both sides are whole seconds, which is why macOS answers in whole seconds
    // where the other two answer with a fraction. libuv does the same.
    return (DateTime.now().millisecondsSinceEpoch ~/ 1000 - bootedAt)
        .toDouble();
  }

  return _procUptime();
}

double? _procUptime() {
  final List<String> lines = _lines('/proc/uptime');

  return lines.isEmpty
      ? null
      : double.tryParse(lines.first.split(RegExp(r'\s+')).first);
}

/// When this process started, as a Unix timestamp in seconds.
double? processStartTime() {
  if (Platform.isWindows) {
    return windows.processStartTime();
  }

  if (_isDarwin) {
    return posix.darwinProcessStartTime();
  }

  final double? bootedSecondsAgo = _procUptime();
  final List<String> lines = _lines('/proc/self/stat');

  if (bootedSecondsAgo == null || lines.isEmpty) {
    return null;
  }

  // The second field is the executable name in brackets and may hold spaces of
  // its own, so the fields are counted from the last bracket rather than the
  // start.
  final int bracket = lines.first.lastIndexOf(')');

  if (bracket < 0) {
    return null;
  }

  final List<String> fields =
      lines.first.substring(bracket + 2).split(RegExp(r'\s+'));
  final int? ticks = fields.length < 20 ? null : int.tryParse(fields[19]);
  final int? perSecond = posix.sysconf(_clockTicksName);

  if (ticks == null || perSecond == null) {
    return null;
  }

  return DateTime.now().millisecondsSinceEpoch / 1000 -
      bootedSecondsAgo +
      ticks / perSecond;
}

/// The name of the processor, such as `Apple M1 Max`.
String? cpuModel() {
  if (Platform.isWindows) {
    return windows.registryString(_windowsCpuKey, 'ProcessorNameString');
  }

  if (_isDarwin) {
    return posix.sysctlString('machdep.cpu.brand_string');
  }

  // Which field names the processor depends on the architecture: x86 writes
  // `model name`, older ARM kernels write `Processor`, MIPS writes `cpu model`,
  // and a board may only name itself.
  const List<String> keys = <String>[
    'model name',
    'Processor',
    'cpu model',
    'Hardware',
    'Model',
  ];
  final Map<String, String> fields = <String, String>{};

  for (final String line in _lines('/proc/cpuinfo')) {
    // The file repeats itself once per core, so the first block is enough.
    if (line.trim().isEmpty) {
      break;
    }

    final int separator = line.indexOf(':');

    if (separator > 0) {
      fields[line.substring(0, separator).trim()] =
          line.substring(separator + 1).trim();
    }
  }

  for (final String key in keys) {
    final String? value = fields[key];

    if (value != null && value.isNotEmpty) {
      return value;
    }
  }

  return null;
}

/// The clock speed of the first processor core, in megahertz.
int cpuSpeed() {
  if (Platform.isWindows) {
    return windows.registryNumber(_windowsCpuKey, '~MHz') ?? 0;
  }

  if (_isDarwin) {
    final int? hertz = posix.sysctlUnsigned('hw.cpufrequency');

    return (hertz == null || hertz == 0) ? _appleSiliconMhz : hertz ~/ 1000000;
  }

  final List<String> lines = _lines(_linuxCpuFrequency);
  // The file is in kilohertz.
  final int? kilohertz =
      lines.isEmpty ? null : int.tryParse(lines.first.trim());

  return kilohertz == null ? 0 : kilohertz ~/ 1000;
}

/// Whether the system has marked [path] hidden. Only Windows keeps such a flag;
/// everywhere else a name beginning with a dot is the convention, which the
/// caller checks for itself.
bool? fileIsHidden(String path) =>
    Platform.isWindows ? windows.fileIsHidden(path) : null;

/// The address this machine would leave from, for a route to [target].
///
/// Nothing is sent to it. The other packages ask the same question the same way,
/// so all three name the interface that would actually carry traffic out rather
/// than the first one that happens to be configured.
String? routedAddress(String target, int port) => Platform.isWindows
    ? windows.routedAddress(target, port)
    : posix.routedAddress(target, port);

/// The machine id Windows records in the registry. The other platforms keep
/// theirs in a file or behind a tool, which the caller reads for itself.
String? machineId() => Platform.isWindows
    ? windows.registryString(r'SOFTWARE\Microsoft\Cryptography', 'MachineGuid')
    : null;

/// The version of the operating system kernel.
String? kernelVersion() {
  if (Platform.isWindows) {
    return windows.kernelVersion();
  }

  if (_isDarwin) {
    return posix.sysctlString('kern.osrelease');
  }

  final List<String> lines = _lines('/proc/sys/kernel/osrelease');

  return lines.isEmpty ? null : lines.first.trim();
}

List<String> _lines(String path) {
  try {
    return const LineSplitter().convert(File(path).readAsStringSync());
  } on Object {
    // The file is not part of every system. The caller has a fallback.
    return const <String>[];
  }
}
