import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:qsu/src/format.dart';
import 'package:qsu/src/math.dart';
import 'package:qsu/src/os/_unsupported.dart'
    if (dart.library.ffi) 'package:qsu/src/os/_native.dart' as platform;

/// The operating systems this package knows, in the order [getPlatform] names
/// them. Anything outside the list is `unknown`.
const List<String> _platformNames = <String>[
  'windows',
  'macos',
  'linux',
  'android',
  'ios',
];

/// Node's own vocabulary, which the three packages share. A system that spells
/// an architecture its own way is translated into one of these.
const Map<String, String> _architectures = <String, String>{
  'arm': 'arm',
  'arm64': 'arm64',
  'ia32': 'ia32',
  'x64': 'x64',
  'riscv32': 'riscv32',
  'riscv64': 'riscv64',
};

/// Returns the operating system the process is running on, as one of
/// `windows`, `macos`, `linux`, `android` and `ios`. Anything else is `unknown`.
String getPlatform() {
  final String name = Platform.operatingSystem;

  return _platformNames.contains(name) ? name : 'unknown';
}

/// Returns the processor architecture the running program was built for, such
/// as `x64` or `arm64`.
String getArch() {
  // The Dart version string ends in the ABI it was built for, such as
  // `on "macos_arm64"`. Reading it here keeps `dart:ffi` out of this library,
  // which the web build cannot even import.
  final RegExpMatch? abi =
      RegExp(r'on "[a-z0-9]+_([a-z0-9]+)"').firstMatch(Platform.version);
  final String? found = abi?.group(1);

  return found == null ? 'unknown' : (_architectures[found] ?? found);
}

/// Returns the version of the operating system kernel.
String getKernelVersion() => platform.kernelVersion() ?? 'Unknown';

/// Returns the byte order of the processor: `LE` or `BE`.
String getEndianness() => Endian.host == Endian.big ? 'BE' : 'LE';

/// Returns the number of processor cores this process may use.
int getCpuCount() => Platform.numberOfProcessors;

/// Returns the name of the processor, such as `Apple M1 Max`.
String getCpu() => platform.cpuModel() ?? 'Unknown';

/// Returns the clock speed of the first processor core, in megahertz.
int getCpuSpeed() => platform.cpuSpeed();

/// Returns the share of processor time spent working rather than idle, as a
/// percentage between `0` and `100`, sampled over [interval] milliseconds.
Future<num> getCpuUsage({int interval = 100, int decimals = 1}) async {
  // Nothing can be measured over no time at all. Sampling anyway would answer
  // with whatever the counters happened to do while the call turned around.
  if (interval <= 0) {
    return 0;
  }

  final (int, int)? before = platform.cpuTicks();

  await Future<void>.delayed(Duration(milliseconds: interval));

  final (int, int)? after = platform.cpuTicks();

  if (before == null || after == null) {
    throw UnsupportedError('Failed to read how the processor spent its time');
  }

  final int total = after.$1 - before.$1;
  final int idle = after.$2 - before.$2;

  if (total <= 0) {
    return 0;
  }

  return round((total - idle).clamp(0, total) / total * 100, decimals);
}

/// Returns the total RAM size of the current device, as readable text.
String getRamSize() => fileSizeFormat(_memory().$1, decimals: 0, ceil: true);

/// Returns the physical memory still available, as readable text.
String getFreeRamSize() =>
    fileSizeFormat(_memory().$2, decimals: 0, ceil: true);

/// Returns the physical memory in use, as readable text.
String getUsedRamSize() {
  final (int, int) memory = _memory();

  return fileSizeFormat((memory.$1 - memory.$2).clamp(0, memory.$1),
      decimals: 0, ceil: true);
}

/// Returns the share of physical memory in use, as a percentage.
num getRamUsage({int decimals = 1}) {
  final (int total, int free) = _memory();

  if (total <= 0) {
    return 0;
  }

  return round((total - free).clamp(0, total) / total * 100, decimals);
}

/// Returns the total size of the filesystem holding [path], as readable text.
Future<String> getDiskSize({String? path}) async =>
    fileSizeFormat(_disk(path).$1, decimals: 0, ceil: true);

/// Returns the space still writable on the filesystem holding [path].
Future<String> getFreeDiskSize({String? path}) async =>
    fileSizeFormat(_disk(path).$2, decimals: 0, ceil: true);

/// Returns the share of the filesystem holding [path] that is in use.
Future<num> getDiskUsage({String? path, int decimals = 1}) async {
  final (int total, int _, int used) = _disk(path);

  if (total <= 0) {
    return 0;
  }

  return round(used / total * 100, decimals);
}

/// Returns the number of seconds the current process has been running.
dynamic getUptime({bool format = false, bool floor = false}) =>
    _elapsed(platform.processStartTime(), format: format, floor: floor);

/// Returns the number of seconds the machine has been running since it booted.
dynamic getSystemUptime({bool format = false, bool floor = false}) {
  final double? seconds = platform.systemUptime();

  if (seconds == null || seconds <= 0) {
    return 0;
  }

  final num value = floor ? seconds.floor() : seconds;

  return format ? numberFormat(value) : value;
}

/// Returns the moment the machine last booted.
DateTime getBootTime() {
  final double? seconds = platform.systemUptime();

  if (seconds == null) {
    throw UnsupportedError(
        'Failed to read how long the system has been running');
  }

  return DateTime.now()
      .subtract(Duration(milliseconds: (seconds * 1000).round()));
}

/// Returns the physical memory this process currently occupies.
String getProcessMemoryUsage() =>
    fileSizeFormat(ProcessInfo.currentRss, decimals: 0, ceil: true);

/// Returns the host name of the current device.
Future<String> getHostname() async {
  if (Platform.isMacOS) {
    // The name given to the machine in System Settings, which is not the kernel
    // hostname. iOS has no such tool and no way to run one.
    final String? name =
        await _command('scutil', <String>['--get', 'ComputerName']);

    if (name != null && name.isNotEmpty) {
      return name;
    }
  }

  if (Platform.isLinux || Platform.isAndroid) {
    final String? name = _firstLine('/etc/hostname');

    if (name != null && name.isNotEmpty) {
      return name;
    }
  }

  return Platform.localHostname.isEmpty ? 'Unknown' : Platform.localHostname;
}

/// Returns the name of the operating system as a person would say it.
Future<String> getOsName() async {
  if (Platform.isMacOS || Platform.isIOS) {
    final String version = Platform.operatingSystemVersion;
    final RegExpMatch? found = RegExp(r'(\d+(?:\.\d+)*)').firstMatch(version);
    final String name = Platform.isIOS ? 'iOS' : 'macOS';

    return found == null ? name : '$name ${found.group(1)}';
  }

  if (Platform.isWindows) {
    return _windowsName();
  }

  for (final String path in const <String>[
    '/etc/os-release',
    '/usr/lib/os-release',
  ]) {
    final String? contents = _read(path);
    final RegExpMatch? found = contents == null
        ? null
        : RegExp(r'^PRETTY_NAME="?([^"\n]+)"?$', multiLine: true)
            .firstMatch(contents);

    if (found != null) {
      return found.group(1)!;
    }
  }

  return Platform.isAndroid ? 'Android' : 'Linux';
}

/// Returns the name of the account the process is running as.
String getUsername() {
  for (final String name in const <String>['USER', 'USERNAME', 'LOGNAME']) {
    final String? value = Platform.environment[name];

    if (value != null && value.isNotEmpty) {
      return value;
    }
  }

  return 'Unknown';
}

/// Returns the current user's home directory.
String getHomeDir() =>
    Platform.environment[Platform.isWindows ? 'USERPROFILE' : 'HOME'] ?? '';

/// Returns the directory the system puts temporary files in.
String getTempDir() => Directory.systemTemp.path;

/// Returns the path to the shell recorded for the current account.
String getShell() {
  if (Platform.isWindows) {
    return Platform.environment['ComSpec'] ?? 'cmd.exe';
  }

  return Platform.environment['SHELL'] ?? '/bin/sh';
}

/// Returns the IPv4 address this machine is reachable at on its own network.
Future<String> getLocalIp() async {
  final List<NetworkInterface> interfaces = await NetworkInterface.list(
      type: InternetAddressType.IPv4, includeLoopback: false);

  for (final NetworkInterface item in interfaces) {
    for (final InternetAddress address in item.addresses) {
      if (!address.isLoopback) {
        return address.address;
      }
    }
  }

  return '127.0.0.1';
}

/// Returns the unique UUID of the current device.
Future<String> getMachineId() async {
  final String? recorded = platform.machineId();

  if (recorded != null && recorded.isNotEmpty) {
    return recorded;
  }

  if (Platform.isMacOS) {
    final String? properties = await _command(
        'ioreg', <String>['-rd1', '-c', 'IOPlatformExpertDevice']);
    final RegExpMatch? found = properties == null
        ? null
        : RegExp(r'"IOPlatformUUID"\s*=\s*"([^"]+)"').firstMatch(properties);

    if (found != null) {
      return found.group(1)!;
    }
  }

  if (Platform.isLinux || Platform.isAndroid) {
    for (final String path in const <String>[
      '/var/lib/dbus/machine-id',
      '/etc/machine-id',
    ]) {
      final String? id = _firstLine(path);

      if (id != null && id.isNotEmpty) {
        return id;
      }
    }
  }

  throw UnsupportedError('Failed to get machine id');
}

/// Returns the Security Identifier (SID) of the current user.
Future<String> getSid() async {
  if (Platform.isWindows) {
    // `whoami` answers with the SID of the account running this process, which
    // is the same value the profile list in the registry records against it.
    final String? line =
        await _command('whoami', <String>['/user', '/fo', 'csv', '/nh']);
    final RegExpMatch? found =
        line == null ? null : RegExp(r'"(S-1-[-0-9]+)"').firstMatch(line);

    if (found != null) {
      return found.group(1)!;
    }

    throw UnsupportedError('Failed to get the SID of the current user');
  }

  if (Platform.isMacOS) {
    final String? sid =
        await _command('dsmemberutil', <String>['getsid', '-U', getUsername()]);

    if (sid != null && sid.isNotEmpty) {
      return sid.replaceAll(RegExp(r'\r?\n'), '');
    }

    throw UnsupportedError('Failed to get the SID of the current user');
  }

  throw UnsupportedError('Not supported on this operating system.');
}

/// Returns the result of running [command] through the system shell.
Future<String?> runCommand(String command) async {
  if (Platform.isIOS) {
    throw UnsupportedError('iOS does not allow a process to be started');
  }

  final ProcessResult result = Platform.isWindows
      ? await Process.run('cmd', <String>['/c', command], runInShell: false)
      : await Process.run('/bin/sh', <String>['-c', command],
          runInShell: false);

  if (result.exitCode != 0) {
    throw ProcessException(
        command, const <String>[], '${result.stderr}'.trim(), result.exitCode);
  }

  final String output = '${result.stdout}';

  return output.endsWith('\n')
      ? output.substring(0, output.length - (output.endsWith('\r\n') ? 2 : 1))
      : output;
}

(int, int) _memory() {
  final (int, int)? memory = platform.memorySize();

  if (memory == null) {
    throw UnsupportedError('Failed to read the size of the physical memory');
  }

  return memory;
}

(int, int, int) _disk(String? path) {
  final (int, int, int)? space =
      platform.diskSpace(path ?? Directory.current.path);

  if (space == null) {
    throw UnsupportedError('Failed to read the size of the filesystem');
  }

  return space;
}

dynamic _elapsed(double? startedAt,
    {required bool format, required bool floor}) {
  if (startedAt == null) {
    throw UnsupportedError('Failed to read when this process started');
  }

  final double seconds =
      DateTime.now().millisecondsSinceEpoch / 1000 - startedAt;

  if (seconds <= 0) {
    return 0;
  }

  final num value = floor ? seconds.floor() : seconds;

  return format ? numberFormat(value) : value;
}

String _windowsName() {
  final List<String> parts = (platform.kernelVersion() ?? '').split('.');
  final int major = parts.isEmpty ? 0 : (int.tryParse(parts[0]) ?? 0);
  final int minor = parts.length < 2 ? 0 : (int.tryParse(parts[1]) ?? 0);
  final int build = parts.length < 3 ? 0 : (int.tryParse(parts[2]) ?? 0);

  if (major == 10) {
    // Windows 11 kept the NT version of Windows 10, so the build number is the
    // only thing that separates them. 22000 is the first Windows 11 build.
    return build >= 22000 ? 'Windows 11' : 'Windows 10';
  }

  if (major == 6) {
    return const <int, String>{
          3: 'Windows 8.1',
          2: 'Windows 8',
          1: 'Windows 7',
        }[minor] ??
        'Windows';
  }

  return 'Windows';
}

String? _read(String path) {
  try {
    return File(path).readAsStringSync();
  } on Object {
    // The file is not part of every system. The caller has a fallback.
    return null;
  }
}

String? _firstLine(String path) {
  final String? contents = _read(path);

  if (contents == null) {
    return null;
  }

  final List<String> lines = const LineSplitter().convert(contents);

  return lines.isEmpty ? null : lines.first.trim();
}

Future<String?> _command(String executable, List<String> arguments) async {
  try {
    final ProcessResult result = await Process.run(executable, arguments);

    return result.exitCode == 0 ? '${result.stdout}'.trim() : null;
  } on Object {
    // The tool is not installed, or the platform forbids starting one.
    return null;
  }
}
