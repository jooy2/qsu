# Changelog (JavaScript)

## 1.17.0 (2026--)

- `strToKebabCase`: Added. Converts a string to `kebab-case`, lowercasing every word and joining them with a hyphen. It splits with `words`, so `XMLHttpRequest` becomes `xml-http-request`. `getSlug` stays the URL-oriented one
- `strToSnakeCase`: Added. Converts a string to `snake_case`, lowercasing every word and joining them with an underscore. It splits with `words`, so `XMLHttpRequest` becomes `xml_http_request` and `abc12def` becomes `abc_12_def`
- `strToCamelCase`: Added. Converts a string to `camelCase`, lowercasing the first word and giving every word after it an uppercase first letter. It splits with `words`, so an acronym stays whole (`XMLHttpRequest` becomes `xmlHttpRequest`) and a run of digits is its own word (`abc12def` becomes `abc12Def`)
- `min`: Added. Returns the smallest of the given numbers, accepting either n arguments or a single array exactly like `sum`. Values that are not numbers are skipped, and so is `NaN`, which would otherwise win by losing every comparison. An empty input returns `null`
- `max`: Added. Returns the largest of the given numbers, accepting either n arguments or a single array exactly like `sum`. Values that are not numbers are skipped, and so is `NaN`, which would otherwise win by losing every comparison. An empty input returns `null`
- `floor`: Added. Rounds a number down, to the given number of decimal places, a negative precision rounding down to tens, hundreds and so on. Rounding goes toward negative infinity, so `floor(-4.006)` is `-5`. The value is shifted through its shortest string representation, so `floor(1.1, 1)` is `1.1`
- `ceil`: Added. Rounds a number up, to the given number of decimal places, a negative precision rounding up to tens, hundreds and so on. Rounding goes toward positive infinity, so `ceil(-4.006)` is `-4`. The value is shifted through its shortest string representation, so `ceil(1.1, 1)` is `1.1` and not `1.2`
- `round`: Added. Rounds a number to the given number of decimal places, a negative precision rounding to tens, hundreds and so on. Ties go away from zero in every language, where the three disagree natively (`0.5` is `1`/`1`/`0` and `-1.5` is `-1`/`-2`/`-2` in JavaScript/Dart/Python) and where Lodash sends them toward positive infinity. The value is shifted through its shortest string representation rather than multiplied by a power of ten, so `round(1.005, 2)` is `1.01` and not `1`
- `clamp`: Added. Restricts a number to an inclusive range, returning `min` below it and `max` above it. The upper bound is applied first, so `min` wins when the two are passed the wrong way round, matching Lodash rather than Dart's `num.clamp`, which throws

## 1.16.0 (2026-08-04)

- `retry`: Added. Runs the given function again on failure until it succeeds or the attempts run out, raising the last error if they all fail. `times` counts total attempts (default `3`), `delay` waits between them and `backoff` multiplies that wait after each failure
- `throttle`: Added. Limits how often a function may run to at most once per `wait` window, the counterpart of `debounce`. `leading` and `trailing` (both `true` by default) choose which edge of the window runs
- `objInvert`: Added. Returns a new object with the keys and values swapped. Values are converted to text because keys are always strings, and the later entry wins when two share a value
- `objMapKeys`: Added. Returns a new object whose keys are the values returned by the callback, with the values carried over untouched. The callback receives `(value, key)`, and the later key wins when two map onto the same name
- `objPickBy`: Added. Returns a new object containing only the entries for which the callback returns `true`. The callback receives `(value, key)`, and only the top level is inspected
- `uncapitalizeFirst`: Added. Converts the first letter of the entire string to lowercase, the inverse of `capitalizeFirst`. Only the first character is touched, so `TEST` becomes `tEST`
- `escapeRegExp`: Added. Escapes every regular expression metacharacter (`^ $ . * + ? ( ) [ ] { } |` and `\`) so a value can be matched literally. `-` and `#` are left alone: they are special only inside a character class, and `\-` outside one is a syntax error in unicode mode
- `deburr`: Added. Replaces accented Latin letters with their unaccented equivalents (`déjà vu` becomes `deja vu`), spelling out `Æ`, `ß`, `Þ`, `Œ` and `Ĳ`, and dropping combining marks. Covers the Latin-1 Supplement and Latin Extended-A blocks
- `words`: Added. Splits a string into the words it is made of. Anything that is neither a letter nor a digit separates words, and camelCase boundaries, runs of capitals (`XMLHttpRequest` is `XML`, `Http`, `Request`) and runs of digits are split as well
- `arrIntersection`: Added. Returns the values that are present in every one of the given arrays. The result is unique and keeps the order of the first array
- `arrDifference`: Added. Returns the values of the first array that are not contained in any of the other arrays. Values are compared by value rather than by reference, so nested arrays and objects are matched as well
- `arrCompact`: Added. Returns a new array with every falsy value removed (`null`, `undefined`, `false`, `0`, `''`, `NaN`). Empty arrays and objects are truthy and are kept

## 1.15.0 (2026-08-02)

- **BREAKING CHANGES**: `isValidFileName` now rejects an empty name and any name carrying a control character (`U+0000`-`U+001F` or `U+007F`). `NUL` is the one that matters: it terminates the path in the system call underneath every filesystem, so a name carrying one was reported as valid and then silently truncated on the way to disk
- **BREAKING CHANGES**: `isValidFileName` now rejects a name ending in a dot or a space on the Windows path. Windows strips it instead of reporting an error, so `report.` quietly becomes `report` and overwrites it. Unix keeps them, so they stay valid with `unixType`
- **BREAKING CHANGES**: `isValidFileName` now measures its 255 limit in UTF-8 bytes rather than characters, which is what ext4, APFS and NTFS enforce. `'가'.repeat(100)` is 100 characters but 300 bytes and cannot be created. Counting characters also disagreed with the Python implementation, which counted code points where JavaScript counted UTF-16 units (`'😀'.repeat(130)` was invalid here and valid there)
- **BREAKING CHANGES**: `createDirectory` now reports the error when a _file_ already sits at the path. It asked only whether _something_ was there and then answered that there was nothing to do, so no directory existed and nothing said so. The `stat` behind that check is gone as well, because `mkdir` with `recursive` is already a no-op for an existing directory
- **BREAKING CHANGES**: `createFile` now creates any parent directory the path needs instead of failing with `ENOENT`, matching the Dart implementation
- **BREAKING CHANGES**: `createFile`, `deleteFile` and `moveFile` now treat a path of nothing but whitespace as no path at all, matching the Dart implementation. `createFile('   ')` used to create a file literally named `   `
- **BREAKING CHANGES**: `getFileInfo` and `getFileSize` now throw the original filesystem error instead of a new `Error` carrying only its message. `code`, `errno` and `path` were dropped with it, so a caller could not tell `ENOENT` from `EACCES`, and the stack pointed at qsu rather than at the call. The unreachable fallback object both functions ended with has been removed
- **BREAKING CHANGES**: `toValidFilePath` now resolves a leading `..` against the root, so `'../../etc/passwd'` returns `/etc/passwd` instead of `/../../etc/passwd`
- `isFileHidden`: Run `attrib` directly instead of handing a command line to a shell. A quote in a file name closed the quoting of `attrib "<path>"` and the rest of the name ran as a command, so scanning a directory could execute whatever a file in it was named. Running the program directly also halves the processes each call starts
- `isFileHidden`: Read the attribute letters out of the column `attrib` prints them in. Removing the caller's path from the output failed whenever a relative path was given, because `attrib` answers with an absolute one, and any `H` in a directory name then read as hidden
- `tailFile`: Read backwards from the end of the file a chunk at a time instead of walking it from the start, and stop shifting a `length`-sized array once per line. The old shape cost `lines × length`: on a 108 MB log the last 20,000 lines took 57 seconds and now take 0.02, and the last single line went from 0.29 seconds to 0.001
- `getCopyFileName`: Accept a `Set` as well as an array, and read it as it is. Naming n files into one directory calls this n times, and rebuilding the set on every call made that loop quadratic — 16,000 names took 19 seconds through an array and 0.01 seconds through a reused `Set`
- `moveFile`: Fall back to a copy and a remove when the operating system reports `EXDEV`. `rename` cannot cross a filesystem boundary, so moving out of the temporary directory, into a mounted volume or onto another drive failed outright
- `deleteAllFileFromDirectory`: Delete up to 32 entries at a time instead of awaiting each one in turn
- `getFileHashFromPath`: Read through `pipeline` with a 1 MB buffer instead of collecting `data` events at the 64 KB stream default
- `hasBadWords`: Catch a banned word broken up by digits (`ad1min`, `사1과`, `사123과`), a common way of hiding a word in Korean. A digit that opens or closes a word is still read as a letter, so a number in front of a word (`2시 발표`) is not read away
- Import every Node.js built-in through the `node:` prefix (`node:crypto`, `node:fs`, `node:fs/promises`, `node:path`, `node:os`, `node:child_process`, `node:stream/promises`). A bare specifier like `crypto`, `path` or `os` also names a real package on npm, so a bundler could resolve it to that package instead of the built-in, and webpack 4 and other older bundlers silently substituted a browser polyfill for it. The prefix marks these as built-ins unambiguously, so a bundler targeting the browser reports them rather than replacing them. The hash functions were also importing from `crypto` and `node:crypto` in the same file. This changes no behavior and no API: the browser-safe `qsu` root entry point never imported a built-in, and everything under `qsu/node` is imported from that subpath as before

## 1.14.0 (2026-07-28)

- **BREAKING CHANGES**: `logBox` now requires a Node.js runtime and is imported from the `qsu/node` subpath. It uses `node:util` and `process`, so exporting it from the browser-safe root entry point could break bundlers
- **BREAKING CHANGES**: `objDeleteKeyByValue`, `objUpdate`, `objMergeNewKey`, `arrShuffle`, `arrMove`, `sortNumeric` and `sortByObjectKey` no longer modify the argument they are given. They all return a new object or array, matching the Dart implementations. `Object.assign(obj, {})` returns `obj` itself and `Array.prototype.sort` reorders in place, so the caller's data used to change underneath it
- **BREAKING CHANGES**: `numUnique` now returns a millisecond timestamp combined with a per-millisecond sequence (16 digits) instead of a timestamp combined with a random number (18 digits). The old value exceeded `Number.MAX_SAFE_INTEGER`, so digits were rounded away and different draws collapsed onto the same number — 100 calls within one millisecond produced only 98 distinct values. Repeated calls in a process are now always unique and strictly increasing
- **BREAKING CHANGES**: `arrShuffle` now returns an array when given a single element, instead of returning that element itself
- **BREAKING CHANGES**: `sortNumeric` and `sortByObjectKey` now apply `descending` through the comparator instead of reversing the sorted result, so equal elements keep their relative order
- **BREAKING CHANGES**: `generateLicense` now normalizes the `type` option correctly, so `'Apache 2.0'`, `'apache-2.0'` and `'BSD 3'` return the license they name instead of silently falling back to MIT (a missing character class in the normalizing regular expression made it a no-op)
- **BREAKING CHANGES**: `isEqual` and `isEqualStrict` now compare objects instead of mistaking them for an argument list. Previously any two objects compared as equal (`isEqual({a: 1}, {a: 2})` returned `true`). Passing the operands as an array still works
- **BREAKING CHANGES**: `safeParseInt` now returns `fallback` when parsing fails (`parseInt` reports failure with `NaN` rather than throwing, so `safeParseInt('abc', 99)` returned `NaN`), and treats `0` as a valid input instead of a missing one
- **BREAKING CHANGES**: `numberFormat` now groups the integer part as a string, so values beyond `Number.MAX_SAFE_INTEGER` keep every digit (`'123456789012345678901'` no longer becomes `'123,456,789,012,345,680,000'`)
- **BREAKING CHANGES**: `encrypt` now stores the authentication tag for AEAD algorithms (GCM, CCM, OCB, ChaCha20-Poly1305) as `iv:authTag:encrypted`. Ciphertext produced by these algorithms was previously impossible to decrypt. The `iv:encrypted` format for CBC and other non-AEAD algorithms is unchanged
- **BREAKING CHANGES**: `arrTo1dArray` no longer throws on `null` or plain objects (`typeof null === 'object'` made it spread a non-iterable); they are now kept as-is, matching the Dart and Python implementations
- `decrypt`: Support AEAD algorithms by reading the authentication tag, and throw a clear error when the input is not in the format `encrypt` returns
- `debounce`: Pass the caller's arguments through to the debounced function (`func.apply(args)` passed them as `thisArg`, so the function always received none), and stop a pending timer from keeping a Node process alive
- `capitalizeEverySentence`: Fix sentences containing characters outside the BMP (emoji) overwriting the wrong character, because a code point array was indexed with UTF-16 offsets
- `strRandom`: Stop appending the string `'undefined'` to the candidate characters when `additionalCharacters` is omitted, which made `u`, `n`, `d`, `e`, `f` and `i` two to three times more likely
- `replaceBetween`: Escape both delimiters correctly. A retained `lastIndex` on a `/g` regular expression left `endChar` unescaped, so `replaceBetween('a(b)c', '(', ')')` threw a syntax error
- `arrUnique`: Stop throwing on arrays containing `undefined` or functions, which have no JSON representation
- `arrRepeat`, `arrTo1dArray`: Stop overflowing the call stack on large arrays by pushing in a loop instead of spreading
- `fetchData`: Fix `bodyType: 'form-data'` requests by leaving `Content-Type` unset, so `fetch` can supply the `boundary` parameter that multipart bodies require
- `is2dArray`: Return on the first nested array instead of walking the whole array and allocating a new one
- `objToArray`, `objTo1d`, `objUpdate`, `objDeleteKeyByValue`: Build the key list once per object instead of on every iteration, which made these O(n^2) (an object with 4,000 keys took over a second in `objUpdate`)
- `numberFormat`, `sortNumeric`, `sortByObjectKey`: Reuse a single `Intl.NumberFormat` / `Intl.Collator` instance instead of constructing one per call
- `numUnique`: Stop building an 89,999 element array on every call to pick a single number
- Remove `lib/verify/isUnique.ts`, an empty file that was never exported but still emitted `isUnique.js` and `isUnique.d.ts` into the published build

## 1.13.2 (2026-07-26)

- `hasBadWords`: Improve `hasBadWords` method

## 1.13.1 (2026-07-26)

- `hasBadWords`: Add `hasBadWords` method

## 1.13.0 (2026-07-26)

- **BREAKING CHANGES**: `duration` now hides milliseconds by default (enable with `withMilliSeconds`) and uses grammatically correct plurals (e.g. `0 Hours`, `1 Hour`)
- **BREAKING CHANGES**: `getFilePathLevel` no longer counts a trailing separator as an extra level (`/home/user/` now returns the same level as `/home/user`)
- **BREAKING CHANGES**: `getCopyFileName` now preserves the original file extension casing (e.g. `Report.PDF` copies to `Report (1).PDF` instead of `Report (1).pdf`)
- **BREAKING CHANGES**: `isValidFileName` now validates the whole name including its extension (so `hello.:txt` is invalid) and rejects Windows device names (`CON`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9`, etc.)
- **BREAKING CHANGES**: `createFileWithDummy` now creates an empty file for a size of `0` instead of throwing, and throws a clearer error for a negative size
- **BREAKING CHANGES**: `getParentFilePath` now returns the root (`/` or `\`) for an empty or single-segment path instead of `/.`
- **BREAKING CHANGES**: `toValidFilePath` now returns the root (`/` or `\`) for a path that collapses to nothing instead of `/.`
- `isFileExists`: Follow symlinks so a dangling link reports as missing on every platform (previously returned `true` for a dangling link on Windows), matching the Dart and Python implementations
- `duration`: Support `Month` (30 days) and `Year` (365 days) units, and add `withMilliSeconds`, `maxUnitCount`, and `unit` (single-unit) options
- `logBox`: Add `logBox` method
- `getParsedInfoFromAddress`: Add `getParsedInfoFromAddress` method
- `getSlug`: Add `getSlug` method

## 1.12.2 (2026-06-06)

- `arrPick`: Add `arrPick` method

## 1.12.1 (2026-05-21)

- `capitalizeEachWords`: If the `natural` option is not enabled, characters that are already uppercase will not be converted to lowercase.

## 1.12.0 (2026-04-14)

- **BREAKING CHANGES**: `strToNumberHash` has renamed to `numberHash`
- `md5Hash`, `sha1Hash`, `sha256Hash`: Add an encoding option for hash functions
- `fetchData`: Minor improvements
- `getUptime`: Add `getUptime` method
- `sha512Hash`: Add `sha512Hash` method

## 1.11.6 (2026-04-12)

- `fetchData`: Minor improvements

## 1.11.5 (2026-03-27)

- `getCopyFileName`: Add `getCopyFileName` method

## 1.11.4 (2026-03-27)

- `net.fetchData`: Add `fetchData` method

## 1.11.3 (2026-03-26)

- `numberFormat`: Fix zero value

## 1.11.2 (2026-03-26)

- **BREAKING CHANGES**: `numRandom` has renamed to `numPick`
- `numUnique`: Add `numUnique` method
- `getCpu`: Add `getCpu` method
- `getFileName`: Fix incorrect directory name with include dot character
- `numberFormat`: Fix where negative numbers were not handled properly, and now return an empty string instead of 0 when the value is null

## 1.11.1 (2026-01-18)

- `getGroupKeys`: Add `getGroupKeys` method

## 1.11.0 (2026-01-09)

- **BREAKING CHANGES**: The `isWindows` argument is no longer used in `getFileExtension`.
- `getFileExtension`: Performance improvements and cleanups
- `getFileName`: Performance improvements and cleanups
- `toValidFilePath`: Performance improvements and cleanups
- `getParentFilePath`: Performance improvements and cleanups
- `joinFilePath`: Performance improvements and cleanups

## 1.10.4 (2025-11-25)

- `getFileSize`: Add `getFileSize` method
- `getRamSize`: Add `getRamSize` method
- `headFile`, `tailFile`: Use better head/tail logic
- `fileSizeFormat`: Add `ceil` argument to the `fileSizeFormat` method

## 1.10.3 (2025-11-04)

- **BREAKING CHANGES**: `getFileSize` has renamed to `fileSizeFormat`

## 1.10.2 (2025-10-15)

- `getHostname`: Add `getHostname` method
- `getStrBytes`: Add `getStrBytes` method

## 1.10.1 (2025-06-08)

- `isEmail`: Add `onlyLowerCase` parameter
- `getFileHash`: This function has been renamed to `getFileHashFromPath`. Also, `getFileHashFromStream` has been added, which can take a ReadableStream and hash it.

## 1.10.0 (2025-03-12)

- The `machini` packages have now been merged into the `qsu` package

## 1.9.3 (2025-03-08)

- `generateLicense`: Add bsd3 license

## 1.9.2 (2025-03-06)

- Update `README.md`

## 1.9.1 (2025-03-01)

- Fix import issue

## 1.9.0 (2025-03-01)

- **BREAKING CHANGES**: The utility functions related to `file`, `crypto` that use Node.js modules have been separated out and should use `import * from 'qsu/node'` instead of `import * from 'qsu'` to use them. These modules do not need to be installed separately.
- Rename export name `server` to `node`

## 1.8.3 (2025-03-01) - DEPRECATED

- Fix import issue

## 1.8.2 (2025-03-01) - DEPRECATED

- Fix import issue

## 1.8.1 (2025-03-01) - DEPRECATED

- Fix import issue

## 1.8.0 (2025-03-01) - DEPRECATED

- **BREAKING CHANGES**: The utility functions related to `file`, `crypto` that use Node.js modules have been separated out and should use `import * from 'qsu/server'` instead of `import * from 'qsu'` to use them. These modules do not need to be installed separately.

## 1.7.2 (2025-03-01)

- `numberFormat`: Fix decimal point format
- `tailFile`, `headFile`: Correct line-break detection in Windows OS
- Clarify node module descriptions

## 1.7.1 (2025-02-28)

- Update documentations

## 1.7.0 (2025-02-27)

- **BREAKING CHANGES**: The `qsu-fs` and `qsu-web` packages have now been merged into the `qsu` package, and all functions in the family package can now be used by installing only `qsu`. For more information, please refer to the documentation.
- **BREAKING CHANGES**: `fileExt`, `fileName`, and `fileSize` have been moved to the file category and renamed to `getFileExtension`, `getFileName`, and `getFileSize`, respectively.
- Separate files by function to strengthen tree shaking

## 1.6.5 (2025-02-23)

- `numberFormat`: Need to handle decimal points
- `truncateExpect`: Fix incorrect characters being added when all strings are displayed

## 1.6.4 (2024-12-20)

- `isTrueMinimumNumberOfTimes`: Use any type (fix build)

## 1.6.3 (2024-12-20)

- `objMergeNewKey`: Added options to customize behavior for arrays

## 1.6.2 (2024-12-08)

- Fix import crypto module

## 1.6.1 (2024-12-07)

- Fix import of type declaration files
- Fix critical import issue

## 1.6.0 (2024-12-06)

NOTE: This version is broken. Please use `1.6.1` or later.

- **BREAKING CHANGES**: The `qsu` package no longer uses classes, so if you want to import the entire module at once, you must use something like `import * as _ from 'qsu'`. (`_` -> `* as _`)
- **BREAKING CHANGES**: The `objectTo1d` method have been renamed to `objTo1d`
- Separate files for each module purpose. Improved tree-shaking.

## 1.5.0 (2024-10-24)

- **BREAKING CHANGES**: The `md5`, `sha1`, and `sha256` methods have been renamed to `md5Hash`, `sha1Hash`, and `sha256Hash`.
- `objMergeNewKey`: Add `objMergeNewKey` method

## 1.4.2 (2024-06-25)

- `isObject`: use more accurate detect logic

## 1.4.1 (2024-05-05)

- `safeJSONParse`: Add `safeJSONParse` method
- `safeParseInt`: Add `safeParseInt` method

## 1.4.0 (2024-04-14)

- **BREAKING CHANGES**: Removed the `msToTime` and `secToTime` methods, which are unstable and have been replaced with the `duration` method to provide a more stable utility.
- `duration`: Add `duration` method

## 1.3.8 (2024-04-12)

- `objectTo1d`: Add `objectTo1d` method
- Strictly check object types on some methods

## 1.3.7 (2024-04-07)

- `trim`: handle error when value is `null`

## 1.3.6 (2024-04-07)

- **BREAKING CHANGES**: The `trim`, Now there is no second argument, and the default behavior is to remove leading and trailing spaces, and change spaces in more than two letters to spaces in the sentence
- **BREAKING CHANGES**: The `getPlatform` method has been deleted

## 1.3.5 (2024-03-31)

- `numberFormat`: allow string type parameter
- `isTrueMinimumNumberOfTimes`: Add `isTrueMinimumNumberOfTimes` method

## 1.3.4 (2024-03-19)

- `objDeleteKeyByValue`: Add `objDeleteKeyByValue` method
- `objUpdate`: Add `objUpdate` method
- `arrGroupByMaxCount`: Add `arrGroupByMaxCount` method

## 1.3.3 (2024-03-05)

- `objFindItemRecursiveByKey`: Add `objFindItemRecursiveByKey` method
- `urlJoin`: Add `urlJoin` method
- `objToArray`: Add `objToArray` method

## 1.3.2 (2023-12-28)

- `strToNumberHash`: Add `strToNumberHash` method
- `objToQueryString`: Add `objToQueryString` method
- `objToPrettyStr`: Add `objToPrettyStr` method

## 1.3.1 (2023-11-08)

- `encrypt`, `decrypt`: Add toBase64 params for result string encoding
- `createDateListFromRange`: Use regex instead of string check
- `getPlatform`: Android is not linux os (This method has now been removed in version 1.3.6)

## 1.3.0 (2023-09-27)

- `objectId`: Add `objectId` method
- `sortByObjectKey`: Add `sortByObjectKey` method
- `sortNumeric`: Add `sortNumeric` method
- Documentation improvements

## 1.2.3 (2023-09-15)

- `truncateExpect`: do not add a closing character to the last character for sentences without a closing character

## 1.2.2 (2023-08-15)

- `replaceBetween`: Add `replaceBetween` method

## 1.2.1 (2023-08-07)

- `capitalizeEverySentence`: Add `capitalizeEverySentence` method
- `arrUnique`: Use fast algorithm for 2d array unique
- `debounce`: Add `debounce` method

## 1.2.0 (2023-06-29)

**BREAKING CHANGES**: The `isBotAgent`, `license` methods were separated from `qsu` to the `qsu-web` package. These methods are no longer available after version 1.2.0.

- Explore the `qsu-web` package: %DEPRECATED%
- Also, I've split the documentation page into the following sites: https://qsu.cdget.com

## 1.1.8 (2023-05-13)

- `strToAscii`: Add `strToAscii` method
- `truncateExpect`: Add `truncateExpect` method

## 1.1.7 (2023-03-17)

- Node.js 12 version deprecation
- `removeSpecialChar`: Using `exceptionCharacters` instead of `withoutSpace`

## 1.1.6 (2023-02-28)

- `isValidDate`: Only the `yyyy-mm-dd` format can be verified
- `dateToYYYYMMDD`: Add `dateToYYYYMMDD` method
- `createDateListFromRange`: Add `createDateListFromRange` method
- `arrCount`: Add `arrCount` method

## 1.1.5 (2023-02-07)

- `isEmail`: Add `isEmail` method
- `sub`: Add `sub` method
- `div`: Add `div` method

## 1.1.4 (2022-12-22)

- `arrTo1dArray`: Add `arrTo1dArray` method
- `isObject`: Add `isObject` method
- `arrRepeat`: Add `arrRepeat` method
- `isValidDate`: Rename `isRealDate` to `isValidDate`

## 1.1.3 (2022-10-23)

- `funcTimes`: Add `funcTimes` method
- `getPlatform`: Add `getPlatform` method (This method has now been removed in version 1.3.6)
- `sum`, `mul`, `split`: Fix type error
- `arrUnique`, `capitalizeEachWords`, `strBlindRandom`: Fix correct use static method
- Support named import
- Change test script to TypeScript

## 1.1.2 (2022-10-20)

- `trim`: Add new trim method
- `fileSize`: When byte is null, returns 0 bytes
- `strCount`: Use indexOf instead of regular expression to use better performance
- `strNumberOf`: Rename method name to strCount
- Add prettier and reformat all codes
- Change require nodejs version to >= 12
- Remove unused ts-node package
- Upgrade package dependencies

## 1.1.1 (2022-10-08)

- Upgrade package dependencies

## 1.1.0 (2022-09-03)

- Reduced bundle size due to minify executable code
- `isBotAgent`: Remove duplicate string

## 1.0.9 (2022-08-15)

- `str`: Handling of null str values

## 1.0.8 (2022-08-15)

- Add GitHub workflows
- `truncate`: Return empty string when str is null
- `fileName`: Resolves Windows's path regardless of system environment

## 1.0.7 (2022-07-24)

- Add `CHANGELOG.md` to `.npmignore`

## 1.0.6 (2022-07-24)

- `isBotAgent`: Add `chrome-lighthouse` in bot lists
- `split`: Fix incorrect return type
- `isEqual`: Add new isEqual method
- `isEqualStrict`: Add new isEqualStrict method
- Import only the methods needed in the path and crypto module

## 1.0.5 (2022-06-23)

- `contains`: When the length of the str parameter value of a string type is 0, no error is thrown and false is returned

## 1.0.4 (2022-06-16)

**BREAKING CHANGES**: `convertDate` is no longer supported due to the removal of `moment` as a dependent module.

The `today` method has changed its usage. We no longer support custom date formats.

- `split`: Add new split method
- `today`: Remove dependent modules, change parameters to use pure code
- `convertDate`: Remove method
- `encrypt`, `decrypt`: Add basic validation check (more fix)

## 1.0.3 (2022-05-24)

- `encrypt`, `decrypt`: Add basic validation check

## 1.0.2 (2022-05-23)

- `encrypt` `decrypt`: Add basic validation check
- `strBlindRandom`: Override the deprecated substr method

## 1.0.1 (2022-05-12)

- Minimize bundle size and clean up code

## 1.0.0 (2022-05-09)

- First version release

## 0.0.1 ~ 0.5.5 (2021-03-16 ~ 2022-04-09)

- This is for the Alpha release and is not recommended for use
