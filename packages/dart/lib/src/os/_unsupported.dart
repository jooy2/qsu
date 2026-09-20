/// (Private) What the machine answers about itself, where nothing can ask it.
///
/// The web has no operating system to question, and `dart:ffi` cannot even be
/// imported there, so this stands in for `_native.dart` on that platform and
/// answers `null` to everything. `dart:io` throws an `UnsupportedError` of its
/// own on the web, so an `os` function fails there whichever of the two it
/// reaches first.
library;

(int, int)? memorySize() => null;

(int, int, int)? diskSpace(String path) => null;

(int, int)? cpuTicks() => null;

double? systemUptime() => null;

double? processStartTime() => null;

String? cpuModel() => null;

int cpuSpeed() => 0;

String? routedAddress(String target, int port) => null;

String? machineId() => null;

String? kernelVersion() => null;
