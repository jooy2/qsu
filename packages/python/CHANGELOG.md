# Changelog (Python)

## 0.2.0 (--)

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
