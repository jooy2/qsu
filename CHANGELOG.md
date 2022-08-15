# Change Log

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
