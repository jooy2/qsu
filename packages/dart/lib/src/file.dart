import 'dart:collection';
import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:path/path.dart';
import 'package:qsu/src/format.dart';
import 'package:unorm_dart/unorm_dart.dart';

/// Creates a directory with the specified path. Ignores the operation if the directory already exists.
Future<void> createDirectory(String filePath, {bool? recursive = true}) async {
  final Directory directory = Directory(filePath);

  // Failures propagate, matching the JS/Python implementations. Catching only
  // `Error` here used to swallow every failure, because dart:io reports them as
  // `FileSystemException`, which is an `Exception` and not an `Error`.
  if (!await directory.exists()) {
    await directory.create(recursive: recursive == true);
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
    // The file does not exist yet, so create it. A failure here propagates,
    // matching the JS/Python implementations.
    await file.create(recursive: true);
  }
}

/// Creates a file with the specified size in bytes.
Future<bool> createFileWithDummy(String filePath, {int? size}) async {
  if (size == null) {
    throw ArgumentError('Size is required');
  }
  if (size < 0) {
    throw ArgumentError('Size must be 0 or greater');
  }

  try {
    if (size == 0) {
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
  final removeExtension =
      withExtension != true && !normalizedPath.endsWith('/');

  if (!normalizedPath.contains('/')) {
    if (removeExtension == true) {
      return basenameWithoutExtension(normalizedPath);
    } else {
      return normalizedPath;
    }
  }

  if (removeExtension == true) {
    return basenameWithoutExtension(normalizedPath);
  } else {
    return basename(normalizedPath);
  }
}

/// Scans an array containing a list of names and displays an alternative name if any duplicates are found. If no duplicates are found, the names are returned as is.
String getCopyFileName(String fileName, List<String> fileNameList) {
  final String fName = getFileName(fileName);
  // Take the extension straight off the original name instead of going through
  // getFileExtension, which lower-cases it. `Report.PDF` must copy to
  // `Report (1).PDF`, not `Report (1).pdf`.
  final String fExt =
      getFileName(fileName, withExtension: true).substring(fName.length);
  final Set<String> existingSet = fileNameList.toSet();

  if (!existingSet.contains(fileName)) {
    return fileName;
  }

  for (var i = 1;; i++) {
    final candidate = '$fName ($i)$fExt';

    if (!existingSet.contains(candidate)) {
      return candidate;
    }
  }
}

/// Returns only the extensions in the file path. If unknown, returns null'.
String? getFileExtension(String filePath) {
  String ext = extension(getFileName(filePath, withExtension: true))
      .replaceAll('.', '')
      .toLowerCase();

  return ext.isNotEmpty ? ext : null;
}

/// Returns the file in the specified path as a value hashed by a specific algorithm. The default algorithm is `md5`. This method uses a `Promise` to return a valid hash value.
Future<String> getFileHashFromPath(String filePath,
    {String? algorithm = 'md5'}) async {
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
  // Delegate to `dirname` rather than splitting by hand. The hand-rolled split
  // collapsed any single-segment relative path to the root ('relative/path'
  // answered '/' instead of '/relative') and mangled UNC paths.
  return toValidFilePath(
    isWindows == true ? windows.dirname(filePath) : posix.dirname(filePath),
    isWindows: isWindows,
  );
}

/// Returns the first line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`.
Future<String?> headFile(String filePath, {int length = 1}) async {
  if (length <= 0) {
    return null;
  }

  final File file = File(filePath);

  try {
    final Stream<String> stream =
        file.openRead().transform(utf8.decoder).transform(const LineSplitter());
    final List<String> lines = <String>[];

    await for (final String line in stream) {
      lines.add(line);

      if (lines.length >= length) {
        break;
      }
    }

    if (lines.isEmpty) {
      return null;
    }

    return lines.join('\n');
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
  // Validate the *whole* name, extension included. Stripping the extension
  // first would let 'hello.:txt' through, because only 'hello' was checked.
  final fileName = getFileName(filePath, withExtension: true);
  final RegExp fileNameRegex = unixType == true
      ? RegExp(r'(^\s+$)|(^\.+$)|([:/]+)')
      : RegExp(r'(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)');

  if (unixType != true &&
      _windowsReservedNameRegex.hasMatch(fileName.split('.')[0])) {
    return false;
  }

  return !fileNameRegex.hasMatch(fileName) && fileName.length <= 255;
}

/// CON, PRN, AUX, NUL, COM1-9 and LPT1-9 are device names reserved by Windows.
/// They stay reserved even when an extension is appended (`nul.txt`).
final RegExp _windowsReservedNameRegex =
    RegExp(r'^(con|prn|aux|nul|com[1-9]|lpt[1-9])$', caseSensitive: false);

/// Determine how many steps the current path is. The root path (`/` or `C:\`) begins with step 1.
int getFilePathLevel(String? filePath) {
  if (filePath == null || filePath.isEmpty) {
    return -1;
  }

  if (filePath == '/') {
    return 1;
  }

  // Strip trailing separators of either flavour so that '/home/user' and
  // '/home/user/' report the same level.
  return toPosixFilePath(filePath.replaceAll(RegExp(r'[\\/]+$'), ''))
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

  // Failures propagate, matching the JS/Python implementations.
  await File(filePath).rename(targetFilePath);
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
  // Delegate to the path package's `normalize` so that '.' and '..' segments
  // collapse the same way they do in JS/Python. The previous regex-only
  // approach left them in place and destroyed the '\\' prefix of UNC paths.
  if (filePath.isEmpty) {
    return isWindows == true ? '\\' : '/';
  }

  if (isWindows == true) {
    String p = windows.normalize(filePath).replaceFirst(RegExp(r'\.$'), '');

    if (p.endsWith('\\') && p.length > 1) {
      p = p.replaceFirst(RegExp(r'\\+$'), '');
    }
    if (p.endsWith(':')) {
      p = '$p\\';
    }
    if (!p.startsWith('\\') && !p.contains(':')) {
      p = '\\$p';
    }

    return p;
  }

  String p = posix.normalize(filePath);

  // `normalize` collapses an empty or self-referential path to '.', which must
  // resolve to the root rather than to a literal '/.' segment.
  if (p == '.') {
    return '/';
  }
  if (!posix.isAbsolute(p)) {
    p = '/$p';
  }
  if (p.endsWith('/') && p.length > 1) {
    p = p.substring(0, p.length - 1);
  }

  return p;
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
