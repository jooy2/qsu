import 'dart:io';

import 'package:path/path.dart';

/// Extract the file name from the path. Include the extension if withExtension is `true`.
String getFileName(String filePath, {bool? withExtension = false}) {
  if (filePath.isEmpty) {
    return '';
  }

  final String normalizedPath = filePath.replaceAll('\\', '/');

  if (!normalizedPath.contains('/')) {
    if (withExtension == true) {
      return normalizedPath;
    } else {
      return basenameWithoutExtension(normalizedPath);
    }
  }

  if (withExtension == true) {
    return basename(normalizedPath);
  } else {
    return basenameWithoutExtension(normalizedPath);
  }
}

/// Returns only the extensions in the file path. If unknown, returns null'.
String? getFileExtension(String filePath, {bool? isWindows = false}) {
  String strPath = filePath.split(isWindows == true ? '\\' : '/').last;

  if (strPath.isEmpty) {
    return null;
  }

  strPath = extension(strPath).isNotEmpty ? extension(strPath) : strPath;

  if (!strPath.contains('.')) {
    return null;
  }

  return strPath.split('.').last.toLowerCase();
}

/// If a file or directory exists at the specified path, it returns `true`.
Future<bool> isFileExists(String filePath) async {
  try {
    final file = File(filePath);

    if (await file.exists()) {
      return true;
    }

    final directory = Directory(filePath);

    if (await directory.exists()) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

/// Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.
bool isValidFileName(String filePath, {bool? unixType = false}) {
  final fileName = getFileName(filePath);
  final RegExp fileNameRegex = unixType == true
      ? RegExp(r'(^\s+$)|(^\.+$)|([:/]+)')
      : RegExp(r'(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)');

  return !fileNameRegex.hasMatch(fileName) && fileName.length <= 255;
}

/// Determine how many steps the current path is. The root path (`/` or `C:\`) begins with step 1.
int getFilePathLevel(String? filePath) {
  if (filePath == null || filePath.isEmpty) {
    return -1;
  }

  if (filePath == '/') {
    return 1;
  }

  return toPosixFilePath(filePath.replaceAll(RegExp(r'\\+$'), ''))
      .split(posix.separator)
      .length;
}

/// Returns the given path as a path in POSIX format (usually used by Linux). For example, a Windows path will be converted to `/` instead of `\\`.
String toPosixFilePath(String filePath) {
  return filePath
      .replaceFirst(RegExp(r'^\\\\\?\\'), '')
      .replaceAll('\\', '/')
      .replaceAll(RegExp(r'//+'), '/');
}
