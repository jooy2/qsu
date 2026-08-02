import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:path/path.dart';
import 'package:qsu/src/format.dart';
import 'package:unorm_dart/unorm_dart.dart';

/// Creates a directory with the specified path. Ignores the operation if the directory already exists.
Future<void> createDirectory(String filePath, {bool? recursive = true}) async {
  // Failures propagate, matching the JS/Python implementations. Catching only
  // `Error` here used to swallow every failure, because dart:io reports them as
  // `FileSystemException`, which is an `Exception` and not an `Error`.
  //
  // `create` is already a no-op for an existing directory and reports an error
  // when a *file* sits at the path, so the `exists` check that used to guard it
  // was a wasted system call.
  await Directory(filePath).create(recursive: recursive == true);
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

/// Enough entries in flight to keep the disk busy without opening thousands of
/// handles at once.
const int _deleteConcurrency = 32;

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

  // Awaiting one entry at a time leaves the isolate idle on a system call it
  // could have overlapped with the next one.
  for (int i = 0, iLen = fileItems.length; i < iLen; i += _deleteConcurrency) {
    final int end =
        i + _deleteConcurrency < iLen ? i + _deleteConcurrency : iLen;

    await Future.wait(fileItems.sublist(i, end).map(deleteFile));
  }
}

/// Returns file or directory information as an easy-to-understand object.
Future<FileInfo> getFileInfo(String filePath) async {
  int dateToUnixTime(DateTime date) =>
      (date.millisecondsSinceEpoch / 1000).floor();

  // The `FileSystemException` is thrown as it is. Wrapping it in
  // `Exception(err.toString())` dropped `osError` and `path`, so a caller could
  // not tell a missing file from a permission error.
  final FileStat stat = await FileStat.stat(filePath);

  if (stat.type == FileSystemEntityType.notFound) {
    throw FileSystemException('Cannot open file', filePath);
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
String getCopyFileName(String fileName, Iterable<String> fileNameList) {
  final String fName = getFileName(fileName);
  // Take the extension straight off the original name instead of going through
  // getFileExtension, which lower-cases it. `Report.PDF` must copy to
  // `Report (1).PDF`, not `Report (1).pdf`.
  final String fExt =
      getFileName(fileName, withExtension: true).substring(fName.length);
  // Naming n files into one directory means calling this n times, so building a
  // fresh Set out of the list on every call makes that loop quadratic. A Set
  // handed in is used as it is, which lets the caller keep one across the loop.
  final Set<String> existingSet =
      fileNameList is Set<String> ? fileNameList : fileNameList.toSet();

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
  // The `FileSystemException` is thrown as it is, so `osError` and `path`
  // survive for the caller to read.
  final FileStat stat = await FileStat.stat(filePath);

  if (stat.type == FileSystemEntityType.notFound) {
    throw FileSystemException('Cannot open file', filePath);
  }

  return stat.size;
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

  // The `FileSystemException` for an unreadable path is thrown as it is.
  final RandomAccessFile handle = await File(filePath).open();

  try {
    // Read forwards a chunk at a time and stop as soon as enough lines are in
    // hand, so the work follows the number of lines asked for rather than the
    // size of the file.
    final List<Uint8List> chunks = <Uint8List>[];
    List<String> lines = <String>[];

    while (true) {
      final Uint8List chunk = await handle.read(_lineChunkSize);

      if (chunk.isEmpty) {
        break;
      }

      chunks.add(chunk);
      lines = _splitLines(_decodeLines(_joinChunks(chunks)));

      // One line more than asked for means every line that will be returned is
      // complete; the last one may still be waiting for the rest of its chunk.
      if (lines.length > length) {
        break;
      }
    }

    if (lines.isEmpty) {
      return null;
    }

    return lines.take(length).join('\n');
  } finally {
    await handle.close();
  }
}

const int _lineChunkSize = 64 * 1024;

/// `LineSplitter` (and Node's readline with `crlfDelay: Infinity`) breaks a line
/// on '\n', '\r\n' and a lone '\r'.
final RegExp _lineBreakRegex = RegExp(r'\r\n|\n|\r');

Uint8List _joinChunks(List<Uint8List> chunks) {
  final BytesBuilder builder = BytesBuilder(copy: false);

  for (final Uint8List chunk in chunks) {
    builder.add(chunk);
  }

  return builder.takeBytes();
}

String _decodeLines(Uint8List bytes) {
  // Malformed bytes are replaced rather than thrown on, matching what the
  // JavaScript and Python implementations do with the same file.
  final String text = utf8.decode(bytes, allowMalformed: true);

  // Dart's UTF-8 decoder drops a leading byte order mark, which silently
  // changes the caller's text. JavaScript and Python both keep it.
  if (bytes.length >= 3 &&
      bytes[0] == 0xEF &&
      bytes[1] == 0xBB &&
      bytes[2] == 0xBF) {
    return '﻿$text';
  }

  return text;
}

List<String> _splitLines(String text) {
  final List<String> lines = text.split(_lineBreakRegex);

  // A break at the end of the text closes the last line, it does not open an
  // empty one.
  if (lines.length > 1 && lines.last.isEmpty) {
    lines.removeLast();
  }

  return lines;
}

/// Returns the last line of the specified text file path. The `length` argument is the total number of lines to print. Default is `1`. The last line of newline characters is ignored.
Future<String?> tailFile(
  String filePath, {
  int length = 1,
}) async {
  if (length <= 0) {
    return null;
  }

  final RandomAccessFile handle = await File(filePath).open();

  try {
    final int size = await handle.length();

    if (size == 0) {
      return null;
    }

    // Read backwards from the end of the file so the work follows the number of
    // lines asked for rather than the size of the file. Reading forwards means
    // a 10 GB log is streamed in full to answer for its last line.
    final List<Uint8List> chunks = <Uint8List>[];
    int position = size;
    List<String> lines = <String>[];

    while (position > 0) {
      final int readLength =
          position < _lineChunkSize ? position : _lineChunkSize;
      position -= readLength;

      await handle.setPosition(position);
      chunks.insert(0, await handle.read(readLength));

      lines = _splitLines(_decodeLines(_joinChunks(chunks)));

      // One line more than asked for means the first line held in the buffer is
      // incomplete - it starts wherever the chunk boundary fell, possibly
      // mid-character - but it is also about to be dropped.
      if (lines.length > length) {
        break;
      }
    }

    final List<String> buffer = lines.length > length
        ? lines.sublist(lines.length - length)
        : List<String>.of(lines);

    // The last line of newline characters is ignored.
    if (buffer.isNotEmpty && buffer.last.isEmpty) {
      buffer.removeLast();
    }

    if (buffer.isEmpty) {
      return null;
    }

    return buffer.join('\n');
  } finally {
    await handle.close();
  }
}

/// If a file or directory exists at the specified path, it returns `true`.
Future<bool> isFileExists(String filePath) async {
  try {
    // One `stat` answers for a file, a directory and a link alike, where asking
    // `File.exists` and then `Directory.exists` cost two of them for every
    // directory. Links are followed, so a dangling one reports as missing.
    return await FileSystemEntity.type(filePath) !=
        FileSystemEntityType.notFound;
  } catch (e) {
    return false;
  }
}

/// Determines whether the passed path or filename is using a system-accepted string (Also check the valid file length). Returns false if the name is not available.
bool isValidFileName(String filePath, {bool? unixType = false}) {
  // Validate the *whole* name, extension included. Stripping the extension
  // first would let 'hello.:txt' through, because only 'hello' was checked.
  final fileName = getFileName(filePath, withExtension: true);

  if (fileName.isEmpty || _controlCharacterRegex.hasMatch(fileName)) {
    return false;
  }

  final RegExp fileNameRegex = unixType == true
      ? RegExp(r'(^\s+$)|(^\.+$)|([:/]+)')
      : RegExp(r'(^\s+$)|(^\.+$)|([<>:"/\\|?*]+)');

  if (unixType != true) {
    if (_windowsReservedNameRegex.hasMatch(fileName.split('.')[0])) {
      return false;
    }

    // Windows strips a trailing dot or space instead of reporting an error, so
    // 'report.' silently becomes 'report' and overwrites it.
    if (_windowsTrailingRegex.hasMatch(fileName)) {
      return false;
    }
  }

  return !fileNameRegex.hasMatch(fileName) &&
      utf8.encode(fileName).length <= _maxFileNameBytes;
}

/// CON, PRN, AUX, NUL, COM1-9 and LPT1-9 are device names reserved by Windows.
/// They stay reserved even when an extension is appended (`nul.txt`).
final RegExp _windowsReservedNameRegex =
    RegExp(r'^(con|prn|aux|nul|com[1-9]|lpt[1-9])$', caseSensitive: false);

final RegExp _windowsTrailingRegex = RegExp(r'[. ]$');

/// NUL terminates a path in the system calls underneath every filesystem, so a
/// name carrying one is silently truncated rather than rejected. The rest of the
/// C0 range and DEL are rejected by Windows outright and are never intentional.
final RegExp _controlCharacterRegex = RegExp(r'[\x00-\x1F\x7F]');

/// Filesystems cap a name at 255 *bytes*, not characters, so the limit is
/// measured after encoding. '가' * 100 is 100 characters but 300 bytes and
/// cannot be created on ext4, APFS or NTFS.
const int _maxFileNameBytes = 255;

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

/// `EXDEV` on POSIX, `ERROR_NOT_SAME_DEVICE` on Windows.
final int _crossDeviceErrorCode = Platform.isWindows ? 17 : 18;

Future<void> _copyRecursive(String filePath, String targetFilePath) async {
  if (await FileSystemEntity.type(filePath) != FileSystemEntityType.directory) {
    await File(filePath).copy(targetFilePath);
    return;
  }

  await Directory(targetFilePath).create(recursive: true);

  await for (final FileSystemEntity entity
      in Directory(filePath).list(followLinks: false)) {
    await _copyRecursive(
      entity.path,
      join(targetFilePath, basename(entity.path)),
    );
  }
}

/// Moves a file in the specified file path to another path.
Future<void> moveFile(String filePath, String targetFilePath) async {
  if (filePath.trim().isEmpty || targetFilePath.trim().isEmpty) {
    return;
  }

  final FileSystemEntityType type =
      await FileSystemEntity.type(filePath, followLinks: false);

  // Failures propagate, matching the JS/Python implementations.
  try {
    switch (type) {
      case FileSystemEntityType.directory:
        // `File(path).rename` reports an error on a directory, so the entity
        // has to be opened as what it actually is. The JavaScript and Python
        // implementations move a directory through the same `rename` call they
        // use for a file.
        await Directory(filePath).rename(targetFilePath);
        break;
      case FileSystemEntityType.link:
        await Link(filePath).rename(targetFilePath);
        break;
      default:
        await File(filePath).rename(targetFilePath);
        break;
    }
  } on FileSystemException catch (err) {
    // `rename` cannot cross a filesystem boundary, and moving out of the
    // temporary directory, into a mounted volume or onto another drive is
    // exactly that. Copying and then removing the source is the only way over.
    if (err.osError?.errorCode != _crossDeviceErrorCode) {
      rethrow;
    }

    await _copyRecursive(filePath, targetFilePath);
    await deleteFile(filePath);
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
  // Delegate to the path package's `normalize` so that '.' and '..' segments
  // collapse the same way they do in JS/Python. The previous regex-only
  // approach left them in place and destroyed the '\\' prefix of UNC paths.
  if (filePath.isEmpty) {
    return isWindows == true ? '\\' : '/';
  }

  if (isWindows == true) {
    String p = windows.normalize(filePath).replaceFirst(RegExp(r'\.$'), '');

    if (!p.startsWith('\\') && !p.contains(':')) {
      // Anchor the path *before* resolving the rest of it: '..' cannot climb
      // above the root, so '..\\..\\Users' is '\\Users' rather than the
      // '\\..\\..\\Users' a plain prefix would leave behind.
      p = windows.normalize('\\$p');
    }
    if (p.endsWith('\\') && p.length > 1) {
      p = p.replaceFirst(RegExp(r'\\+$'), '');
    }
    if (p.endsWith(':')) {
      p = '$p\\';
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
    // Anchor the path *before* resolving the rest of it: '..' cannot climb
    // above the root, so '../../etc/passwd' is '/etc/passwd' rather than the
    // '/../../etc/passwd' a plain prefix would leave.
    p = posix.normalize('/$p');
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
