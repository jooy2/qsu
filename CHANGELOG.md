# Change Log

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

- Explore the `qsu-web` package: https://github.com/jooy2/qsu-web
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
- `fileName`: Resolves windows path regardless of system environment

## 1.0.7 (2022-07-24)

- Add `CHANGELOG.md` to `.npmignore`

## 1.0.6 (2022-07-24)

- `isBotAgent`: Add `chrome-lighthouse` in bot lists
- `split`: Fix incorrect return type
- `isEqual`: Add new isEqual method
- `isEqualStrict`: Add new isEqualStrict method
- Import only the methods needed in the path and crypto module

## 1.0.5 (2022-06-23)

- `contains`: When the length of the str parameter value of string type is 0, no error is thrown and false is returned

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
