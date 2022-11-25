# Change Log

## 1.1.4 (2022-)
- `arrTo1dArray`: Add `arrTo1dArray` method

## 1.1.3 (2022-10-23)

- `funcTimes`: Add `funcTimes` method
- `getPlatform`: Add `getPlatform` method
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

**NOTICE**: `convertDate` is no longer supported due to the removal of `moment` as a dependent module.

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
