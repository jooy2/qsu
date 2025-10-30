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
String? getFileExtension(String filePath, {bool isWindows = false}) {
  String strPath = filePath.split(isWindows ? '\\' : '/').last;

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
