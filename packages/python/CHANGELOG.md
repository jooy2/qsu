# Changelog (Python)

## 0.2.0 (--)

- **BREAKING CHANGES**: `duration` now hides milliseconds by default (enable with `withMilliSeconds`) and uses grammatically correct plurals (e.g. `0 Hours`, `1 Hour`)
- `duration`: Support `Month` (30 days) and `Year` (365 days) units, and add `withMilliSeconds`, `maxUnitCount`, and `unit` (single-unit) options
- `getParsedInfoFromAddress`: Add `getParsedInfoFromAddress` method
- `getSlug`: Add `getSlug` method

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
