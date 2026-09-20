import 'dart:ffi';
import 'dart:typed_data';

import 'package:ffi/ffi.dart';

/// (Private) The system calls Windows answers through.
///
/// `DynamicLibrary.process()` is not available on Windows, so each library is
/// opened by name. All three ship with the system.

typedef _GlobalMemoryStatusExNative = Int32 Function(Pointer<Uint8>);
typedef _GlobalMemoryStatusExDart = int Function(Pointer<Uint8>);

typedef _GetTickCount64Native = Uint64 Function();
typedef _GetTickCount64Dart = int Function();

typedef _GetSystemTimesNative = Int32 Function(
    Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>);
typedef _GetSystemTimesDart = int Function(
    Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>);

typedef _GetCurrentProcessNative = IntPtr Function();
typedef _GetCurrentProcessDart = int Function();

typedef _GetProcessTimesNative = Int32 Function(
    IntPtr, Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>);
typedef _GetProcessTimesDart = int Function(
    int, Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>);

typedef _GetDiskFreeSpaceExNative = Int32 Function(
    Pointer<Utf16>, Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>);
typedef _GetDiskFreeSpaceExDart = int Function(
    Pointer<Utf16>, Pointer<Uint64>, Pointer<Uint64>, Pointer<Uint64>);

typedef _RegGetValueNative = Int32 Function(IntPtr, Pointer<Utf16>,
    Pointer<Utf16>, Uint32, Pointer<Uint32>, Pointer<Uint8>, Pointer<Uint32>);
typedef _RegGetValueDart = int Function(int, Pointer<Utf16>, Pointer<Utf16>,
    int, Pointer<Uint32>, Pointer<Uint8>, Pointer<Uint32>);

typedef _RtlGetVersionNative = Int32 Function(Pointer<Uint8>);
typedef _RtlGetVersionDart = int Function(Pointer<Uint8>);

const int _hkeyLocalMachine = 0x80000002;
const int _restrictToString = 0x00000002;
const int _restrictToNumber = 0x00000010;

/// A `FILETIME` counts 100-nanosecond intervals since the start of 1601.
const int _intervalsPerSecond = 10000000;
const int _secondsFrom1601To1970 = 11644473600;

/// The total and the still-available physical memory, in bytes.
(int, int)? memoryStatus() {
  const int structBytes = 64;
  final Pointer<Uint8> status = calloc<Uint8>(structBytes);
  final ByteData view = ByteData.sublistView(status.asTypedList(structBytes));

  view.setUint32(0, structBytes, Endian.host);

  try {
    if (_globalMemoryStatusEx(status) == 0) {
      return null;
    }

    final ByteData filled =
        ByteData.sublistView(status.asTypedList(structBytes));

    return (
      filled.getUint64(8, Endian.host),
      filled.getUint64(16, Endian.host),
    );
  } finally {
    calloc.free(status);
  }
}

/// Seconds since the machine booted.
double? systemUptime() => _getTickCount64() / 1000;

/// Processor time since boot, as a total and the part of it spent idle.
(int, int)? cpuTicks() {
  final Pointer<Uint64> idle = calloc<Uint64>();
  final Pointer<Uint64> kernel = calloc<Uint64>();
  final Pointer<Uint64> user = calloc<Uint64>();

  try {
    if (_getSystemTimes(idle, kernel, user) == 0) {
      return null;
    }

    // The kernel figure already counts the idle time inside it.
    return (kernel.value + user.value, idle.value);
  } finally {
    calloc.free(idle);
    calloc.free(kernel);
    calloc.free(user);
  }
}

/// When this process started, as a Unix timestamp.
double? processStartTime() {
  final Pointer<Uint64> created = calloc<Uint64>();
  final Pointer<Uint64> exited = calloc<Uint64>();
  final Pointer<Uint64> kernel = calloc<Uint64>();
  final Pointer<Uint64> user = calloc<Uint64>();

  try {
    if (_getProcessTimes(_getCurrentProcess(), created, exited, kernel, user) ==
        0) {
      return null;
    }

    return created.value / _intervalsPerSecond - _secondsFrom1601To1970;
  } finally {
    calloc.free(created);
    calloc.free(exited);
    calloc.free(kernel);
    calloc.free(user);
  }
}

/// The total, free and used bytes of the volume holding [path].
(int, int, int)? diskSpace(String path) {
  final Pointer<Utf16> target = path.toNativeUtf16();
  final Pointer<Uint64> available = calloc<Uint64>();
  final Pointer<Uint64> total = calloc<Uint64>();
  final Pointer<Uint64> free = calloc<Uint64>();

  try {
    if (_getDiskFreeSpaceEx(target, available, total, free) == 0) {
      return null;
    }

    // `free` is every unused byte on the volume and `total` already honours a
    // quota set on the account, which is the split the other packages report.
    return (total.value, free.value, total.value - free.value);
  } finally {
    calloc.free(target);
    calloc.free(available);
    calloc.free(total);
    calloc.free(free);
  }
}

/// One string value under `HKEY_LOCAL_MACHINE`.
String? registryString(String key, String name) {
  final Pointer<Uint8>? value =
      _registryValue(key, name, _restrictToString, 512);

  if (value == null) {
    return null;
  }

  try {
    final String text = value.cast<Utf16>().toDartString();

    return text.trim().isEmpty ? null : text.trim();
  } finally {
    calloc.free(value);
  }
}

/// One numeric value under `HKEY_LOCAL_MACHINE`.
int? registryNumber(String key, String name) {
  final Pointer<Uint8>? value = _registryValue(key, name, _restrictToNumber, 4);

  if (value == null) {
    return null;
  }

  try {
    return ByteData.sublistView(value.asTypedList(4)).getUint32(0, Endian.host);
  } finally {
    calloc.free(value);
  }
}

Pointer<Uint8>? _registryValue(
    String key, String name, int restrict, int bytes) {
  final Pointer<Utf16> subKey = key.toNativeUtf16();
  final Pointer<Utf16> valueName = name.toNativeUtf16();
  final Pointer<Uint8> buffer = calloc<Uint8>(bytes);
  final Pointer<Uint32> size = calloc<Uint32>()..value = bytes;

  try {
    final int result = _regGetValue(
        _hkeyLocalMachine, subKey, valueName, restrict, nullptr, buffer, size);

    if (result != 0) {
      calloc.free(buffer);

      return null;
    }

    return buffer;
  } finally {
    calloc.free(subKey);
    calloc.free(valueName);
    calloc.free(size);
  }
}

/// The NT version the kernel reports, such as `10.0.26100`.
String? kernelVersion() {
  const int structBytes = 276;
  final Pointer<Uint8> info = calloc<Uint8>(structBytes);

  ByteData.sublistView(info.asTypedList(structBytes))
      .setUint32(0, structBytes, Endian.host);

  try {
    if (_rtlGetVersion(info) != 0) {
      return null;
    }

    final ByteData view = ByteData.sublistView(info.asTypedList(structBytes));

    return '${view.getUint32(4, Endian.host)}'
        '.${view.getUint32(8, Endian.host)}'
        '.${view.getUint32(12, Endian.host)}';
  } finally {
    calloc.free(info);
  }
}

final DynamicLibrary _kernel32 = DynamicLibrary.open('kernel32.dll');
final DynamicLibrary _advapi32 = DynamicLibrary.open('advapi32.dll');
final DynamicLibrary _ntdll = DynamicLibrary.open('ntdll.dll');

final _GlobalMemoryStatusExDart _globalMemoryStatusEx = _kernel32
    .lookupFunction<_GlobalMemoryStatusExNative, _GlobalMemoryStatusExDart>(
        'GlobalMemoryStatusEx');

final _GetTickCount64Dart _getTickCount64 =
    _kernel32.lookupFunction<_GetTickCount64Native, _GetTickCount64Dart>(
        'GetTickCount64');

final _GetSystemTimesDart _getSystemTimes =
    _kernel32.lookupFunction<_GetSystemTimesNative, _GetSystemTimesDart>(
        'GetSystemTimes');

final _GetCurrentProcessDart _getCurrentProcess =
    _kernel32.lookupFunction<_GetCurrentProcessNative, _GetCurrentProcessDart>(
        'GetCurrentProcess');

final _GetProcessTimesDart _getProcessTimes =
    _kernel32.lookupFunction<_GetProcessTimesNative, _GetProcessTimesDart>(
        'GetProcessTimes');

final _GetDiskFreeSpaceExDart _getDiskFreeSpaceEx = _kernel32.lookupFunction<
    _GetDiskFreeSpaceExNative, _GetDiskFreeSpaceExDart>('GetDiskFreeSpaceExW');

final _RegGetValueDart _regGetValue = _advapi32
    .lookupFunction<_RegGetValueNative, _RegGetValueDart>('RegGetValueW');

final _RtlGetVersionDart _rtlGetVersion = _ntdll
    .lookupFunction<_RtlGetVersionNative, _RtlGetVersionDart>('RtlGetVersion');
