# Changelog (Python)

## 1.2.0 (2026--)

- `deburr`: Added. Replaces accented Latin letters with their unaccented equivalents (`déjà vu` becomes `deja vu`), spelling out `Æ`, `ß`, `Þ`, `Œ` and `Ĳ`, and dropping combining marks. Covers the Latin-1 Supplement and Latin Extended-A blocks
- `words`: Added. Splits a string into the words it is made of. Anything that is neither a letter nor a digit separates words, and camelCase boundaries, runs of capitals (`XMLHttpRequest` is `XML`, `Http`, `Request`) and runs of digits are split as well
- `arrIntersection`: Added. Returns the values that are present in every one of the given arrays. The result is unique and keeps the order of the first array
- `arrDifference`: Added. Returns the values of the first array that are not contained in any of the other arrays. Values are compared by value rather than by identity, so nested lists and dicts are matched as well
- `arrCompact`: Added. Returns a new array with every falsy value removed (`None`, `False`, `0`, `''`, `nan`). An empty list and an empty dict are kept, matching the JavaScript implementation

## 1.1.0 (2026-08-04)

- **BREAKING CHANGES**: `isValidFileName` now rejects an empty name and any name carrying a control character (`U+0000`-`U+001F` or `U+007F`). `NUL` is the one that matters: it terminates the path in the system call underneath every filesystem, so a name carrying one was reported as valid and then silently truncated on the way to disk
- **BREAKING CHANGES**: `isValidFileName` now rejects a name ending in a dot or a space on the Windows path. Windows strips it instead of reporting an error, so `report.` quietly becomes `report` and overwrites it. Unix keeps them, so they stay valid with `unixType`
- **BREAKING CHANGES**: `isValidFileName` now measures its 255 limit in UTF-8 bytes rather than characters, which is what ext4, APFS and NTFS enforce. `'가' * 100` is 100 characters but 300 bytes and cannot be created. Counting characters also disagreed with the JavaScript and Dart implementations, which count UTF-16 units where Python counted code points (`'😀' * 130` was valid here and invalid there)
- **BREAKING CHANGES**: `headFile` and `tailFile` now replace malformed UTF-8 with `U+FFFD` instead of raising `UnicodeDecodeError`, matching the JavaScript and Dart implementations. One bad byte in a log file no longer stops it from being read
- **BREAKING CHANGES**: `headFile` and `tailFile` now break a line on a lone `\r` as well as on `\n` and `\r\n`, matching Node's readline and Dart's `LineSplitter`. A file written on a pre-OS X Mac used to come back as a single line
- **BREAKING CHANGES**: `createDirectory` now reports the error when a *file* already sits at the path. It asked only whether *something* was there and then answered that there was nothing to do, so no directory existed and nothing said so
- **BREAKING CHANGES**: `createFile` now creates any parent directory the path needs instead of raising `FileNotFoundError`, matching the Dart implementation
- **BREAKING CHANGES**: `createFile`, `deleteFile` and `moveFile` now treat a path of nothing but whitespace as no path at all, matching the Dart implementation. `createFile('   ')` used to create a file literally named `   `
- **BREAKING CHANGES**: `getFileInfo` and `getFileSize` now raise the original `OSError` instead of a plain `Exception` carrying only its text. `errno`, `strerror` and `filename` were dropped with it, so a caller could not tell a missing file from a permission error. The unreachable `return` both functions ended with has been removed
- **BREAKING CHANGES**: `getFileInfo` now builds `dirname` with `os.path`, which follows the host platform, instead of always splitting on `/`. A Windows path used to come back whole
- **BREAKING CHANGES**: `toValidFilePath` now resolves a leading `..` against the root, so `'../../etc/passwd'` returns `/etc/passwd` instead of `/../../etc/passwd`
- `isFileHidden`: Read the attribute letters out of the column `attrib` prints them in. Removing the caller's path from the output failed whenever a relative path was given, because `attrib` answers with an absolute one, and any `H` in a directory name then read as hidden
- `headFile`: Read the file in chunks instead of pulling all of it into memory with a single `read()`. Asking for the first line of a 108 MB log held 476 MB at once and now holds a chunk
- `tailFile`: Read backwards from the end of the file a chunk at a time instead of walking it from the start, and stop popping the front of a `length`-sized list once per line. The old shape cost `lines × length`: on a 108 MB log the last 20,000 lines took 6.8 seconds and now take 0.06, and the last single line went from 0.28 seconds to 0.001
- `getCopyFileName`: Accept a `set` as well as a list, and read it as it is. Naming n files into one directory calls this n times, and rebuilding the set on every call made that loop quadratic — 16,000 names took 11 seconds through a list and 0.03 seconds through a reused `set`
- `moveFile`: Fall back to a copy and a remove when the operating system reports `EXDEV`. `os.rename` cannot cross a filesystem boundary, so moving out of the temporary directory, into a mounted volume or onto another drive failed outright
- `isFileExists`: Drop the `os.access` call whose result was thrown away, halving the system calls this makes
- `getFileInfo`: Read the directory flag out of the `stat` result already in hand instead of asking the filesystem a second time through `os.path.isdir`
- `createDirectory`: Drop the `isFileExists` call that ran before every `makedirs`. `makedirs` with `exist_ok` is already a no-op for an existing directory
- `hasBadWords`: Catch a banned word broken up by digits (`ad1min`, `사1과`, `사123과`), a common way of hiding a word in Korean. A digit that opens or closes a word is still read as a letter, so a number in front of a word (`2시 발표`) is not read away

## 1.0.0 (2026-07-28)

- **BREAKING CHANGES**: `encrypt` and `decrypt` now honour the `algorithm` argument. Every algorithm silently produced AES-CBC before, so a value such as `aes-256-gcm` was accepted but ignored and the output did not match the JavaScript implementation. AEAD modes (GCM) now carry the authentication tag as `iv:authTag:encrypted`; the `iv:encrypted` format for CBC is unchanged. The key length is validated against the algorithm, as it is in JavaScript
- **BREAKING CHANGES**: `decrypt` now validates PKCS7 padding, so decrypting with the wrong key raises instead of quietly returning an empty string
- **BREAKING CHANGES**: `generateLicense` now normalizes the `type` argument correctly, so `'Apache 2.0'`, `'apache-2.0'` and `'BSD 3'` return the license they name instead of silently falling back to MIT (a missing character class in the normalizing regular expression made it a no-op)
- **BREAKING CHANGES**: `numberHash` and `strToAscii` now iterate UTF-16 code units, like the JavaScript and Dart implementations. `ord()` returns a code point, so characters outside the BMP produced different values (`'😀'` hashed to `128512` instead of `1772899`)
- **BREAKING CHANGES**: `numUnique` now returns a millisecond timestamp combined with a per-millisecond sequence (16 digits) instead of a timestamp combined with a random number (18 digits). Repeated calls within a process are now always unique and strictly increasing
- **BREAKING CHANGES**: `isEqual` and `isEqualStrict` now compare dicts instead of mistaking them for an argument list. Iterating a dict yielded its keys, so every dict comparison returned `False`. Passing the operands as a list or tuple still works
- **BREAKING CHANGES**: `objDeleteKeyByValue`, `objUpdate`, `arrShuffle`, `arrMove`, `sortNumeric` and `sortByObjectKey` no longer modify the argument they are given; they all return a new dict or list
- **BREAKING CHANGES**: `arrShuffle` now returns a list when given a single element, instead of returning that element itself
- **BREAKING CHANGES**: `sortNumeric` and `sortByObjectKey` now apply `descending` through the sort key instead of reversing the sorted result, so equal elements keep their relative order
- **BREAKING CHANGES**: `safeParseInt` now treats `0` as a valid input instead of a missing one, so `safeParseInt(0, 99)` returns `0`
- **BREAKING CHANGES**: `trim` now returns `None` for any non-string input instead of raising an `AttributeError` on truthy values such as `trim(123)`
- `strBlindRandom`: Keep the result the same length as the input. The character that was checked and the character that was masked were one position apart, and the index could land past the end of the string and append instead of mask
- `generateLicense`: Accept an options `dict` as the first positional argument, like the rest of the package
- `is2dArray`: Return on the first nested list instead of building a filtered copy of the whole list (640ms to 0ms on a 100,000 element list)
- `isBotAgent`: Remove 84 of the 172 alternatives that were substrings of another one (`bot` already matches `naverbot`, `bingbot`, ...) and could never change the outcome — verified identical on 200,000 inputs. Roughly halves the matching cost
- `numUnique`: Stop building an 89,999 element list on every call to pick a single number
- `capitalizeEachWords`: Look the stop words up in a `frozenset` instead of scanning a list through `contains`
- **BREAKING CHANGES**: `duration` now hides milliseconds by default (enable with `withMilliSeconds`) and uses grammatically correct plurals (e.g. `0 Hours`, `1 Hour`)
- **BREAKING CHANGES**: `getFilePathLevel` no longer counts a trailing separator as an extra level (`/home/user/` now returns the same level as `/home/user`)
- **BREAKING CHANGES**: `getCopyFileName` now preserves the original file extension casing (e.g. `Report.PDF` copies to `Report (1).PDF` instead of `Report (1).pdf`)
- **BREAKING CHANGES**: `isValidFileName` now validates the whole name including its extension (so `hello.:txt` is invalid) and rejects Windows device names (`CON`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9`, etc.)
- **BREAKING CHANGES**: `createFileWithDummy` now creates an empty file for a size of `0` instead of throwing, and throws a clearer error for a negative size
- **BREAKING CHANGES**: `getParentFilePath` now returns the root (`/` or `\`) for an empty or single-segment path instead of `/.`
- **BREAKING CHANGES**: `toValidFilePath` now returns the root (`/` or `\`) for a path that collapses to nothing instead of `/.`
- `duration`: Support `Month` (30 days) and `Year` (365 days) units, and add `withMilliSeconds`, `maxUnitCount`, and `unit` (single-unit) options
- `getParsedInfoFromAddress`: Add `getParsedInfoFromAddress` method
- `getSlug`: Add `getSlug` method
- `hasBadWords`: Add `hasBadWords` method

## 0.1.0 (2026-06-16)

- Initial release of the Python package
- Add `string` utilities: `capitalizeEachWords`, `capitalizeEverySentence`, `capitalizeFirst`, `getGroupKeys`, `getStrBytes`, `removeNewLine`, `removeSpecialChar`, `replaceBetween`, `split`, `strBlindRandom`, `strCount`, `strRandom`, `strShuffle`, `strToAscii`, `strUnique`, `trim`, `truncate`, `truncateExpect`, `urlJoin`
- Add `array` utilities: `arrCount`, `arrGroupByMaxCount`, `arrMove`, `arrPick`, `arrRepeat`, `arrShuffle`, `arrTo1dArray`, `arrUnique`, `arrWithDefault`, `arrWithNumber`, `average`, `sortByObjectKey`, `sortNumeric`
- Add `object` utilities: `objDeleteKeyByValue`, `objFindItemRecursiveByKey`, `objMergeNewKey`, `objTo1d`, `objToArray`, `objToPrettyStr`, `objToQueryString`, `objUpdate`
- Add `date` utilities: `createDateListFromRange`, `dateToYYYYMMDD`, `dayDiff`, `isValidDate`, `today`
- Add `format` utilities: `duration`, `fileSizeFormat`, `numberFormat`, `safeJSONParse`, `safeParseInt`
- Add `math` utilities: `div`, `mul`, `numPick`, `numUnique`, `sub`, `sum`
- Add `verify` utilities: `between`, `contains`, `is2dArray`, `isEmail`, `isEmpty`, `isEqual`, `isEqualStrict`, `isObject`, `isTrueMinimumNumberOfTimes`, `isUrl`, `len`
- Add `web` utilities: `generateLicense`, `isBotAgent`, `isMatchPathname`, `isMobile`, `removeLocalePrefix`
- Add `misc` utilities: `debounce`, `funcTimes`, `logBox`, `sleep` (async functions are implemented synchronously)
- Add `crypto` utilities: `decodeBase64`, `decrypt`, `encodeBase64`, `encrypt`, `md5Hash`, `numberHash`, `objectId`, `sha1Hash`, `sha256Hash`, `sha512Hash` (`encrypt`/`decrypt` use the `cryptography` package)
- Add `file` utilities: `createDirectory`, `createFile`, `createFileWithDummy`, `deleteAllFileFromDirectory`, `deleteFile`, `getCopyFileName`, `getFileExtension`, `getFileHashFromPath`, `getFileHashFromStream`, `getFileInfo`, `getFileName`, `getFilePathLevel`, `getFileSize`, `getParentFilePath`, `headFile`, `isFileExists`, `isFileHidden`, `isValidFileName`, `joinFilePath`, `moveFile`, `normalizeFile`, `tailFile`, `toPosixFilePath`, `toValidFilePath`
- Add `os` utilities: `getCpu`, `getHostname`, `getMachineId`, `getRamSize`, `getSid`, `getUptime`, `runCommand`
- Add `net` utility: `fetchData`
