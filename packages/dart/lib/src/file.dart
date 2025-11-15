import 'dart:io';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:path/path.dart';
import 'package:qsu/src/format.dart';
import 'package:unorm_dart/unorm_dart.dart';

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

/// Create a file of empty data. If the same file already exists, it is ignored.
Future<void> createFile(String filePath) async {
  if (filePath.trim().isEmpty) {
    return;
  }

  final File file = File(filePath);
  final DateTime now = DateTime.now();

  try {
    await file.setLastAccessed(now);
    await file.setLastModified(now);
  } catch (_) {
    try {
      await file.create(recursive: true);
    } catch (_) {
      // Do nothing
    }
  }
}

/// Creates a file with the specified size in bytes.
Future<bool> createFileWithDummy(String filePath, {int? size}) async {
  try {
    if (size == 0 || size == null) {
      await createFile(filePath);
      return true;
    }

    final File file = File(filePath);
    final RandomAccessFile randomAccessFile =
        await file.open(mode: FileMode.write);

    final Uint8List oneByte = Uint8List(1);

    await randomAccessFile.setPosition(size - 1);
    await randomAccessFile.writeFrom(oneByte);
    await randomAccessFile.close();

    return true;
  } catch (_) {
    return false;
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

/// Deletes all files in the specified directory path. However, the directory is preserved.
Future<void> deleteAllFileFromDirectory(String directoryPath) async {
  final List<String> fileItems = [];

  try {
    final Directory directory = Directory(directoryPath);

    if (await directory.exists()) {
      await for (final entity in directory.list(followLinks: false)) {
        fileItems.add(entity.path);
      }
    }
  } catch (_) {
    // Do nothing
  }

  for (final filePath in fileItems) {
    await deleteFile(filePath);
  }
}

/// Returns file or directory information as an easy-to-understand object.
Future<FileInfo> getFileInfo(String filePath) async {
  int dateToUnixTime(DateTime date) =>
      (date.millisecondsSinceEpoch / 1000).floor();

  try {
    final FileStat stat = await FileStat.stat(filePath);

    if (stat.type == FileSystemEntityType.notFound) {
      throw Exception("File not found");
    }

    final bool isDirectory = stat.type == FileSystemEntityType.directory;

    return FileInfo(
      success: true,
      isDirectory: isDirectory,
      ext: getFileExtension(filePath),
      size: stat.size,
      sizeHumanized: fileSizeFormat(stat.size),
      name: getFileName(filePath),
      dirname: dirname(filePath),
      path: normalize(absolute(filePath)),
      created: dateToUnixTime(stat.changed),
      modified: dateToUnixTime(stat.modified),
    );
  } catch (err) {
    throw Exception(err.toString());
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

/// Returns the file in the specified path as a value hashed by a specific algorithm. The default algorithm is `md5`. This method uses a `Promise` to return a valid hash value.
Future<String> getFileHashFromPath(String filePath,
    {String? algorithm = 'md5' // 'md5' | 'sha1' | 'sha256' | 'sha512'
    }) async {
  if (filePath.isEmpty) {
    throw ArgumentError('Invalid file path');
  }

  Hash hashAlgorithm;

  switch (algorithm) {
    case 'md5':
      hashAlgorithm = md5;
      break;
    case 'sha1':
      hashAlgorithm = sha1;
      break;
    case 'sha256':
      hashAlgorithm = sha256;
      break;
    case 'sha512':
      hashAlgorithm = sha512;
      break;
    default:
      throw ArgumentError('Invalid hash algorithm: $algorithm');
  }

  final File file = File(filePath);
  final Stream<List<int>> inputStream = file.openRead();

  final Digest digest = await inputStream.transform(hashAlgorithm).first;

  return digest.toString();
}

/// Calculates the size of the file at the given path.
Future<int> getFileSize(String filePath) async {
  try {
    final FileStat stat = await FileStat.stat(filePath);

    if (stat.type == FileSystemEntityType.notFound) {
      throw Exception("File not found");
    }

    return stat.size;
  } catch (err) {
    throw Exception(err.toString());
  }
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

/// Returns the first line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`.
Future<String?> headFile(String filePath, {int length = 1}) async {
  try {
    final File file = File(filePath);
    final String content = await file.readAsString();

    if (content.isEmpty) {
      return null;
    }

    final String eol = Platform.isWindows ? '\r\n' : '\n';
    final List<String> lines = content.split(eol);

    final int maxLines = length < lines.length ? length : lines.length;

    if (maxLines == 0) {
      return null;
    }

    final StringBuffer buffer = StringBuffer();

    for (int i = 0; i < maxLines; i++) {
      buffer.write(lines[i]);

      if (!(length < 2 || i == maxLines - 1)) {
        buffer.write('\n');
      }
    }

    final result = buffer.toString();

    return result.isEmpty ? null : result;
  } catch (e) {
    throw Exception(e.toString());
  }
}

/// Returns the last line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`. The last line of newline characters is ignored.
Future<String?> tailFile(
  String filePath, {
  int length = 1,
}) async {
  if (length <= 0) {
    return null;
  }

  final File file = File(filePath);

  try {
    final Stream<String> stream =
        file.openRead().transform(utf8.decoder).transform(const LineSplitter());
    final ListQueue<String> buffer = ListQueue<String>(length);

    await for (final String line in stream) {
      if (buffer.length == length) {
        buffer.removeFirst();
      }

      buffer.addLast(line);
    }

    if (buffer.isEmpty) {
      return null;
    }

    if (buffer.isNotEmpty && buffer.last.isEmpty) {
      buffer.removeLast();
    }

    if (buffer.isEmpty) {
      return null;
    }

    return buffer.join('\n');
  } catch (e) {
    throw Exception(e.toString());
  }
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

/// Combines paths for each operating system according to the given parameter values.
String joinFilePath(List<String> paths, {bool? isWindows}) {
  final List<String> normalized = [];

  for (var i = 0; i < paths.length; i++) {
    String part = paths[i];

    if (i > 0) {
      if (isWindows == true) {
        part = part.replaceFirst(RegExp(r'^[\\/]+'), '');
      } else {
        part = part.replaceFirst(RegExp(r'^/+'), '');
      }
    }

    normalized.add(part);
  }

  final String joined = isWindows == true
      ? windows.joinAll(normalized)
      : posix.joinAll(normalized);

  return toValidFilePath(
    isWindows == true ? windows.normalize(joined) : posix.normalize(joined),
    isWindows: isWindows,
  );
}

/// Moves a file in the specified file path to another path.
Future<void> moveFile(String filePath, String targetFilePath) async {
  if (filePath.trim().isEmpty || targetFilePath.trim().isEmpty) {
    return;
  }

  try {
    await File(filePath).rename(targetFilePath);
  } catch (_) {
    // Do nothing
  }
}

/// Returns the file name within the path.
String normalizeFile(String filePath, {String? normalizationForm}) {
  if (filePath.isEmpty) {
    return '';
  }

  switch (normalizationForm) {
    case null:
    case 'NFC':
      return nfc(filePath);
    case 'NFD':
      return nfd(filePath);
    case 'NFKC':
      return nfkc(filePath);
    case 'NFKD':
      return nfkd(filePath);
    default:
      throw RangeError('Invalid normalization form: $normalizationForm');
  }
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

class FileInfo {
  final bool success;
  final bool isDirectory;
  final int size;
  final String sizeHumanized;
  final String name;
  final String dirname;
  final String path;
  final String? ext;
  final int created;
  final int modified;

  FileInfo({
    required this.success,
    required this.isDirectory,
    required this.size,
    required this.sizeHumanized,
    required this.name,
    required this.dirname,
    required this.path,
    required this.ext,
    required this.created,
    required this.modified,
  });
}
