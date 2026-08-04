# Changelog (Dart)

## 1.5.0 (2026--)

- `arrIntersection`: Added. Returns the values that are present in every one of the given arrays. The result is unique and keeps the order of the first array
- `arrDifference`: Added. Returns the values of the first array that are not contained in any of the other arrays. Values are compared by value rather than by identity, so nested lists and maps are matched as well
- `arrCompact`: Added. Returns a new array with every falsy value removed (`null`, `false`, `0`, `''`, `NaN`). An empty list and an empty map are kept, matching the JavaScript implementation

## 1.4.0 (2026-08-)

- **BREAKING CHANGES**: `isValidFileName` now rejects an empty name and any name carrying a control character (`U+0000`-`U+001F` or `U+007F`). `NUL` is the one that matters: it terminates the path in the system call underneath every filesystem, so a name carrying one was reported as valid and then silently truncated on the way to disk
- **BREAKING CHANGES**: `isValidFileName` now rejects a name ending in a dot or a space on the Windows path. Windows strips it instead of reporting an error, so `report.` quietly becomes `report` and overwrites it. Unix keeps them, so they stay valid with `unixType`
- **BREAKING CHANGES**: `isValidFileName` now measures its 255 limit in UTF-8 bytes rather than characters, which is what ext4, APFS and NTFS enforce. `'가' * 100` is 100 characters but 300 bytes and cannot be created
- **BREAKING CHANGES**: `headFile` and `tailFile` now replace malformed UTF-8 with `U+FFFD` instead of throwing a `FormatException`, matching the JavaScript and Python implementations. One bad byte in a log file no longer stops it from being read
- **BREAKING CHANGES**: `headFile` and `tailFile` now keep a leading byte order mark. Dart's UTF-8 decoder drops it, which silently changed text that JavaScript and Python both return whole
- **BREAKING CHANGES**: `moveFile` now moves a directory as well as a file, with everything inside it. `File(path).rename` reports an error on a directory, so the entity is opened as what it actually is
- **BREAKING CHANGES**: `getFileInfo` and `getFileSize` now throw the `FileSystemException` as it is instead of wrapping it in `Exception(err.toString())`, which dropped `osError` and `path` and left a caller unable to tell a missing file from a permission error. `headFile` and `tailFile` no longer wrap theirs either
- **BREAKING CHANGES**: `toValidFilePath` now resolves a leading `..` against the root, so `'../../etc/passwd'` returns `/etc/passwd` instead of `/../../etc/passwd`
- **BREAKING CHANGES**: `getCopyFileName` now takes an `Iterable<String>` instead of a `List<String>`, and reads a `Set` as it is. Naming n files into one directory calls this n times, and rebuilding the set on every call made that loop quadratic — 16,000 names took 21 seconds through a `List` and 0.01 seconds through a reused `Set`
- `tailFile`: Read backwards from the end of the file a chunk at a time instead of streaming it from the start. On a 108 MB log the last line took 0.73 seconds and now takes 0.002
- `headFile`: Read forwards a chunk at a time and stop as soon as enough lines are in hand, rather than running the whole file through a stream transformer
- `moveFile`: Fall back to a copy and a remove when the operating system reports a cross-device error. `rename` cannot cross a filesystem boundary, so moving out of the temporary directory, into a mounted volume or onto another drive failed outright
- `isFileExists`: Answer with a single `FileSystemEntity.type` call rather than asking `File.exists` and then `Directory.exists`, which cost two system calls for every directory
- `createDirectory`: Drop the `exists` call that ran before every `create`. `create` is already a no-op for an existing directory and already reports a file in the way
- `deleteAllFileFromDirectory`: Delete up to 32 entries at a time instead of awaiting each one in turn
- `hasBadWords`: Catch a banned word broken up by digits (`ad1min`, `사1과`, `사123과`), a common way of hiding a word in Korean. A digit that opens or closes a word is still read as a letter, so a number in front of a word (`2시 발표`) is not read away

## 1.3.0 (2026-07-28)

- **BREAKING CHANGES**: `numberHash` now returns the low 32 bits as a signed value, so it can be negative as documented and matches the JavaScript and Python implementations (`numberHash('k10000')` is `-1184917978`, not `3110049318`)
- **BREAKING CHANGES**: The `base64url` hash encoding is now unpadded, and `binary` now returns the raw digest as latin-1 characters instead of a string of 0s and 1s, both matching the JavaScript and Python implementations
- **BREAKING CHANGES**: `truncateExpect` no longer inserts the literal text `null` into the result when `endStringChar` is omitted (`truncateExpect('Hi. Bye.', 3)` returned `'Hinull'`)
- **BREAKING CHANGES**: `numUnique` now returns a millisecond timestamp combined with a per-millisecond sequence (16 digits) instead of a timestamp combined with a random number (18 digits). Repeated calls within a process are now always unique and strictly increasing
- **BREAKING CHANGES**: `isValidDate` now rejects years `0100`-`1599`, which the JavaScript and Python implementations also reject. Two-digit years `16`-`99` and four-digit years `1600`-`9999` remain valid
- **BREAKING CHANGES**: `dayDiff` now returns the absolute difference, so swapping the arguments no longer flips the sign
- **BREAKING CHANGES**: `arrMove` no longer modifies the list it is given; it returns a new one
- **BREAKING CHANGES**: `strRandom` returns an empty string and `funcTimes` returns an empty list for a non-positive count, instead of throwing, matching the JavaScript and Python implementations
- **BREAKING CHANGES**: `objTo1d` now rejects a `null` separator, which used to be interpolated into every nested key as the literal text `null`
- **BREAKING CHANGES**: `isMatchPathname` now throws for an empty matcher list instead of quietly returning `false`
- `strUnique`: Deduplicate by code point, so characters outside the BMP (emoji) are no longer broken apart
- `capitalizeFirst`, `capitalizeEachWords`: Return an empty string instead of throwing a `RangeError` on empty input
- `replaceBetween`: Escape the whole delimiter, so multi-character delimiters produce a valid pattern; `replaceWith` now defaults to an empty string as documented
- `removeSpecialChar`, `removeLocalePrefix`: Escape the caller's characters before building the pattern, so values like `']'` or `zh.CN` are matched literally instead of being interpreted as a pattern
- `isMatchPathname`, `removeLocalePrefix`: Accept any iterable, not only `List<String>`. A `List<dynamic>` (what JSON decoding produces) used to be stringified whole and never matched
- `md5Hash`, `sha1Hash`, `sha256Hash`, `sha512Hash`: Fall back to hex when `encoding` is explicitly `null` instead of throwing
- `isBotAgent`: Remove 84 of the 172 alternatives that were substrings of another one (`bot` already matches `naverbot`, `bingbot`, ...) and could never change the outcome — verified identical on 200,000 inputs. Roughly halves the matching cost
- `isBotAgent`, `isMobile`, `getSlug`, `removeSpecialChar`, `replaceBetween`, `trim`, `capitalizeEverySentence`, `getParsedInfoFromAddress`: Compile regular expressions once instead of on every call — `getSlug` was building three per character
- `objectId`, `strShuffle`, `strRandom`, `numPick`: Reuse a single `Random` instance instead of constructing one per draw
- **BREAKING CHANGES**: `getParentFilePath` now handles relative paths (`relative/path` -> `/relative`), UNC paths, and trailing separators correctly
- **BREAKING CHANGES**: `toValidFilePath` now resolves `.` and `..` segments and preserves the UNC `\\` prefix
- **BREAKING CHANGES**: `getFilePathLevel` no longer counts a trailing separator as an extra level (`/home/user/` now returns the same level as `/home/user`)
- **BREAKING CHANGES**: `getCopyFileName` now preserves the original file extension casing (e.g. `Report.PDF` copies to `Report (1).PDF` instead of `Report (1).pdf`)
- **BREAKING CHANGES**: `isValidFileName` now validates the whole name including its extension (so `hello.:txt` is invalid) and rejects Windows device names (`CON`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9`, etc.)
- **BREAKING CHANGES**: `createFileWithDummy` now throws for a negative size instead of returning `false`
- **BREAKING CHANGES**: `createDirectory`, `moveFile`, and `createFile` now propagate filesystem errors instead of silently ignoring them
- `duration`: Add `duration` method
- `arrPick`: Add `arrPick` method
- `getParsedInfoFromAddress`: Add `getParsedInfoFromAddress` method
- `getSlug`: Add `getSlug` method
- `hasBadWords`: Add `hasBadWords` method
- `capitalizeEachWords`: If the `natural` option is not enabled, characters that are already uppercase will not be converted to lowercase

## 1.2.0 (2026-04-14)

- **BREAKING CHANGES**: `strToNumberHash` has renamed to `numberHash`
- `md5Hash`, `sha1Hash`, `sha256Hash`: Add an encoding option for hash functions
- Add `sortNumeric` method
- Add `sha512Hash` method

## 1.1.12 (2026-03-31)

- **BREAKING CHANGES**: `numRandom` has renamed to `numPick`
- `getFileName`: Fix incorrect directory name with include dot character
- Add `getCopyFileName` method
- Add `div` method
- Add `mul` method
- Add `sub` method
- Add `sum` method
- Add `createDateListFromRange` method
- Add `dateToYYYYMMDD` method
- Add `dayDiff` method
- Add `isValidDate` method
- Add `today` method

## 1.1.11 (2025-12-10)

- Add `split` method
- Add `isMobile` method
- Add `objDeleteKeyByValue` method

## 1.1.10 (2025-11-25)

- Fix package dependencies

## 1.1.9 (2025-11-25)

- Add `getFileSize` method
- Add `normalizeFile` method
- Add `headFile` method
- Add `tailFile` method
- Add `removeLocalePrefix` method
- Add `isMatchPathname` method
- Add `isBotAgent` method
- Add `ceil` argument to the `fileSizeFormat` method

## 1.1.8 (2025-11-13)

- Add `createDirectory` method
- Add `getParentFilePath` method
- Add `deleteFile` method
- Add `createFile` method
- Add `deleteAllFileFromDirectory` method
- Add `moveFile` method
- Add `createFileWithDummy` method
- Add `getFileInfo` method
- Add `joinFilePath` method
- Add `getFileHashFromPath` method

## 1.1.7 (2025-11-03)

- **BREAKING CHANGES**: `getFileSize` has renamed to `fileSizeFormat`
- **BREAKING CHANGES**: `safeJSONParse`: 'fallback' parameters has changed to named parameter
- **BREAKING CHANGES**: `objToArray`: 'recursive' parameters has changed to named parameter
- Add `getFileName` and `getFileExtension` methods
- Add `isFileExists` method
- Add `isValidFileName` method
- Add `toPosixFilePath` method
- Add `getFilePathLevel` method
- Add `toValidFilePath` method

## 1.1.6 (2025-10-15)

- `isEmail`: add `onlyLowerCase` parameter
- Add `console` method
- Add `getStrBytes` method

## 1.1.5 (2025-03-06)

- Update `README.md`

## 1.1.4 (2025-02-28)

- Update documentation

## 1.1.3 (2025-02-14)

- Fix `isUrl` parameters

## 1.1.2 (2025-02-14)

- Add `debounce` method
- Add `isUrl` method
- Add `isObject` method
- Add `isEqual` method
- Add `isEqualStrict` method
- Add `isEmpty` method

## 1.1.1 (2024-11-26)

- Fix `objTo1d` parameters

## 1.1.0 (2024-11-26)

- Add `arrCount` method
- Add `between` method
- Add `arrGroupByMaxCount` method
- Add `numPick` method
- Add `len` method
- Add `isTrueMinimumNumberOfTimes` method
- Add `objToQueryString` method
- Add `objToArray` method
- Add `objTo1d` method

## 1.0.0 (2024-10-19)

- Add `fileSize` method
- Add `fileExt` method
- Add `safeParseInt` method
- Add `isEmail` method
- Add `fileName` method
- Add `safeJSONParse` method
- Add `md5Hash` method
- Add `sha1Hash` method
- Add `sha256Hash` method
- Add `encodeBase64` method
- Add `decodeBase64` method
- Add `strToNumberHash` method
- Add `objectId` method

## 0.0.4 (2024-10-02)

- Add `average` method
- Add `arrMove` method
- Add `arrTo1dArray` method
- Add `arrRepeat` method

## 0.0.3 (2024-10-02)

- Add `strShuffle` method
- Add `strRandom` method
- Add `truncateExpect` method
- Add `strUnique` method
- Add `strToAscii` method
- Add `urlJoin` method
- Add `arrWithDefault` method
- Add `arrWithNumber` method
- Add `funcTimes` method
- Add `is2dArray` method
- Add `arrUnique` method

## 0.0.2 (2024-09-10)

- Add `trim` method
- Add `replaceBetween` method
- Add `removeNewLine` method
- Add `capitalizeEverySentence` method
- Add `contains` method
- Add `capitalizeEachWords` method
- Add `strCount` method
- Add `sleep` method
- Add `arrShuffle` method
- Add `removeSpecialChar` method

## 0.0.1 (2024-09-02) - Not for Production

- Initial release
