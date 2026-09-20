import 'dart:ffi';
import 'dart:io';
import 'dart:typed_data';

import 'package:ffi/ffi.dart';

/// (Private) The system calls macOS, iOS, Linux and Android answer through.
///
/// Every symbol here is part of the C library that is already linked into the
/// process, so nothing is loaded from disk and no command is run. `iOS` allows
/// exactly this and forbids spawning a process, which is why the `os` functions
/// are built on it rather than on `Process.run`.

typedef _SysctlByNameNative = Int32 Function(
    Pointer<Utf8>, Pointer<Void>, Pointer<Size>, Pointer<Void>, Size);
typedef _SysctlByNameDart = int Function(
    Pointer<Utf8>, Pointer<Void>, Pointer<Size>, Pointer<Void>, int);

typedef _SysctlNative = Int32 Function(
    Pointer<Int32>, Uint32, Pointer<Void>, Pointer<Size>, Pointer<Void>, Size);
typedef _SysctlDart = int Function(
    Pointer<Int32>, int, Pointer<Void>, Pointer<Size>, Pointer<Void>, int);

typedef _StatvfsNative = Int32 Function(Pointer<Utf8>, Pointer<Uint8>);
typedef _StatvfsDart = int Function(Pointer<Utf8>, Pointer<Uint8>);

typedef _SysconfNative = Int64 Function(Int32);
typedef _SysconfDart = int Function(int);

typedef _HostStatisticsNative = Int32 Function(
    Uint32, Int32, Pointer<Uint32>, Pointer<Uint32>);
typedef _HostStatisticsDart = int Function(
    int, int, Pointer<Uint32>, Pointer<Uint32>);

typedef _MachHostSelfNative = Uint32 Function();
typedef _MachHostSelfDart = int Function();

final DynamicLibrary _process = DynamicLibrary.process();

/// `statvfs` writes a struct whose layout differs between the two systems. Only
/// three of its fields are read, and both are large enough for this buffer.
const int _statvfsBufferBytes = 256;

// Offsets into `struct statvfs`, in 64-bit words. Linux orders it
// `f_bsize, f_frsize, f_blocks, f_bfree, f_bavail, …`; Darwin orders it
// `f_bsize, f_frsize, f_blocks, f_bfree, f_bavail, …` with 32-bit counts.
const int _linuxBlockSizeWord = 1;
const int _linuxBlocksWord = 2;
const int _linuxFreeWord = 3;
const int _linuxAvailableWord = 4;

/// One numeric `sysctl`, read by name. Darwin only.
int? sysctlUnsigned(String name) {
  final Pointer<Utf8> key = name.toNativeUtf8();
  final Pointer<Uint64> value = calloc<Uint64>();
  final Pointer<Size> size = calloc<Size>()..value = sizeOf<Uint64>();

  try {
    if (_sysctlByName(key, value.cast(), size, nullptr, 0) != 0) {
      return null;
    }

    return value.value;
  } finally {
    calloc.free(key);
    calloc.free(value);
    calloc.free(size);
  }
}

/// One textual `sysctl`, read by name. Darwin only.
String? sysctlString(String name) {
  final Pointer<Utf8> key = name.toNativeUtf8();
  final Pointer<Size> size = calloc<Size>();

  try {
    // The first call asks how long the value is, the second reads it.
    if (_sysctlByName(key, nullptr, size, nullptr, 0) != 0 || size.value == 0) {
      return null;
    }

    final Pointer<Uint8> buffer = calloc<Uint8>(size.value);

    try {
      if (_sysctlByName(key, buffer.cast(), size, nullptr, 0) != 0) {
        return null;
      }

      final String value = buffer.cast<Utf8>().toDartString();

      return value.isEmpty ? null : value;
    } finally {
      calloc.free(buffer);
    }
  } finally {
    calloc.free(key);
    calloc.free(size);
  }
}

/// One `sysctl` read as raw bytes, for a value that is a struct. Darwin only.
Uint8List? sysctlBytes(String name, int length) {
  final Pointer<Utf8> key = name.toNativeUtf8();
  final Pointer<Uint8> buffer = calloc<Uint8>(length);
  final Pointer<Size> size = calloc<Size>()..value = length;

  try {
    if (_sysctlByName(key, buffer.cast(), size, nullptr, 0) != 0) {
      return null;
    }

    return Uint8List.fromList(buffer.asTypedList(size.value));
  } finally {
    calloc.free(key);
    calloc.free(buffer);
    calloc.free(size);
  }
}

/// The `timeval` a Darwin `sysctl` answers with, as whole seconds.
int? sysctlSeconds(String name) {
  final Uint8List? value = sysctlBytes(name, 16);

  if (value == null || value.length < 8) {
    return null;
  }

  return ByteData.sublistView(value).getInt64(0, Endian.host);
}

/// One `sysconf` value, such as the page size or the clock tick.
int? sysconf(int name) {
  try {
    final int value = _sysconf(name);

    return value > 0 ? value : null;
  } on ArgumentError {
    return null;
  }
}

/// The total, free and used bytes of the filesystem holding [path].
(int, int, int)? statvfs(String path) {
  final Pointer<Utf8> target = path.toNativeUtf8();
  final Pointer<Uint8> buffer = calloc<Uint8>(_statvfsBufferBytes);

  try {
    if (_statvfs(target, buffer) != 0) {
      return null;
    }

    final ByteData view =
        ByteData.sublistView(buffer.asTypedList(_statvfsBufferBytes));

    if (Platform.isMacOS || Platform.isIOS) {
      // Darwin writes `f_bsize` and `f_frsize` as machine words and the block
      // counts as 32-bit values right after them.
      final int frsize = view.getUint64(8, Endian.host);
      final int blocks = view.getUint32(16, Endian.host);
      final int free = view.getUint32(20, Endian.host);
      final int available = view.getUint32(24, Endian.host);

      return _space(frsize, blocks, free, available);
    }

    final int frsize = view.getUint64(_linuxBlockSizeWord * 8, Endian.host);
    final int blocks = view.getUint64(_linuxBlocksWord * 8, Endian.host);
    final int free = view.getUint64(_linuxFreeWord * 8, Endian.host);
    final int available = view.getUint64(_linuxAvailableWord * 8, Endian.host);

    return _space(frsize, blocks, free, available);
  } finally {
    calloc.free(target);
    calloc.free(buffer);
  }
}

(int, int, int)? _space(int unit, int blocks, int free, int available) {
  if (unit <= 0 || blocks <= 0) {
    return null;
  }

  // `available` is what an ordinary user may still write, which leaves out the
  // blocks held back for the superuser; `free` is every unused block. The other
  // packages split the two the same way.
  return (blocks * unit, available * unit, (blocks - free) * unit);
}

/// Processor time since boot, as a total and the part of it spent idle. Darwin.
(int, int)? machCpuTicks() {
  const int hostCpuLoadInfo = 3;
  const int states = 4;
  const int idleState = 2;

  final Pointer<Uint32> info = calloc<Uint32>(states);
  final Pointer<Uint32> count = calloc<Uint32>()..value = states;

  try {
    if (_hostStatistics(_machHostSelf(), hostCpuLoadInfo, info, count) != 0) {
      return null;
    }

    final List<int> ticks = info.asTypedList(states).toList();

    return (ticks.reduce((int a, int b) => a + b), ticks[idleState]);
  } finally {
    calloc.free(info);
    calloc.free(count);
  }
}

/// When this process started, as a Unix timestamp. Darwin.
double? darwinProcessStartTime() {
  const int ctlKern = 1;
  const int kernProc = 14;
  const int kernProcPid = 1;

  final Pointer<Int32> mib = calloc<Int32>(4);
  mib[0] = ctlKern;
  mib[1] = kernProc;
  mib[2] = kernProcPid;
  mib[3] = pid;

  final Pointer<Size> size = calloc<Size>();

  try {
    if (_sysctl(mib, 4, nullptr, size, nullptr, 0) != 0 || size.value == 0) {
      return null;
    }

    final Pointer<Uint8> buffer = calloc<Uint8>(size.value);

    try {
      if (_sysctl(mib, 4, buffer.cast(), size, nullptr, 0) != 0) {
        return null;
      }

      // A `kinfo_proc` opens with the `extern_proc` whose first member is a
      // union, and the second half of that union is the `timeval` the process
      // started at. This is the same layout `ps` reads.
      final ByteData view =
          ByteData.sublistView(buffer.asTypedList(size.value));
      final int seconds = view.getInt64(0, Endian.host);
      final int microseconds = view.getInt32(8, Endian.host);

      return seconds + microseconds / 1000000;
    } finally {
      calloc.free(buffer);
    }
  } finally {
    calloc.free(mib);
    calloc.free(size);
  }
}

final _SysctlByNameDart _sysctlByName = _process
    .lookupFunction<_SysctlByNameNative, _SysctlByNameDart>('sysctlbyname');

final _SysctlDart _sysctl =
    _process.lookupFunction<_SysctlNative, _SysctlDart>('sysctl');

final _StatvfsDart _statvfs =
    _process.lookupFunction<_StatvfsNative, _StatvfsDart>('statvfs');

final _SysconfDart _sysconf =
    _process.lookupFunction<_SysconfNative, _SysconfDart>('sysconf');

final _HostStatisticsDart _hostStatistics =
    _process.lookupFunction<_HostStatisticsNative, _HostStatisticsDart>(
        'host_statistics');

final _MachHostSelfDart _machHostSelf = _process
    .lookupFunction<_MachHostSelfNative, _MachHostSelfDart>('mach_host_self');
