import 'dart:io';

import 'package:path/path.dart';

/// Creates a directory with the specified path. Ignores the operation if the directory already exists.
Future<void> createDirectory(String filePath, {bool? recursive = true}) async {
  try {
    final Directory directory = Directory(filePath);

    if (!await directory.exists()) {
      await directory.create(recursive: recursive == true);
    }
  } catch (error) {
    if (error is Error) {
      throw Exception(error.toString());
    }
  }
}

/// Delete files or directory in the specified path. If the file does not exist in the path, it is ignored.
Future<void> deleteFile(String filePath) async {
  if (filePath.trim().isEmpty) {
    return;
  }

  try {
    final type = await FileSystemEntity.type(filePath, followLinks: false);

    switch (type) {
      case FileSystemEntityType.file:
        await File(filePath).delete();
        break;
      case FileSystemEntityType.directory:
        await Directory(filePath).delete(recursive: true);
        break;
      case FileSystemEntityType.link:
        await Link(filePath).delete();
        break;
      case FileSystemEntityType.notFound:
      default:
        break;
    }
  } catch (_) {
    // Do nothing
  }
}

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

/// Returns the parent path one level above the given path.
String getParentFilePath(String filePath, {bool? isWindows = false}) {
  final separator = isWindows == true ? '\\' : '/';
  final listPathItem = filePath.split(separator);

  if (listPathItem.isNotEmpty) {
    listPathItem.removeLast();
  }

  String currentPath;

  if (listPathItem.length == 1) {
    currentPath = isWindows == true ? 'C:\\' : '/';
  } else {
    currentPath = listPathItem.join(separator);
  }

  return toValidFilePath(currentPath, isWindows: isWindows);
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

/// Remove invalid or unnecessary characters in the path.
String toValidFilePath(String filePath, {bool? isWindows = false}) {
  if (isWindows == true) {
    String windowsPath = filePath;

    if (windowsPath.length > 2 &&
        !RegExp(r'^[a-zA-Z]:').hasMatch(windowsPath)) {
      windowsPath = '\\$windowsPath';
    }

    if (RegExp(r'\\$').hasMatch(windowsPath) &&
        RegExp(r'\\').allMatches(windowsPath).length > 1) {
      windowsPath = windowsPath.replaceFirst(RegExp(r'\\$'), '');
    }

    if (RegExp(r'^[a-zA-Z]:$').hasMatch(windowsPath)) {
      windowsPath = '$windowsPath\\';
    }

    return windowsPath.replaceAll(RegExp(r'\\{2,}'), '\\');
  }

  String unixPath = filePath;

  if (!RegExp(r'^/').hasMatch(unixPath)) {
    unixPath = '/$unixPath';
  }

  unixPath = unixPath.replaceAll(RegExp(r'/+'), '/');

  if (unixPath.length > 1) {
    unixPath = unixPath.replaceFirst(RegExp(r'/$'), '');
  }

  return unixPath;
}
