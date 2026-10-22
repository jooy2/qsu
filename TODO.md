# TODO

Work that has been looked into but not started. Check an item off, or delete it, in the commit that settles it.

## Naming review

Every public function, parameter and option name in the three packages was read against its implementation in October 2026. The JavaScript signature and `lib/_types/global.ts` are the reference, and the Dart named parameters and Python keyword arguments were compared against them. The `is*` predicates, the `generate*` grouping, the `arr*`, `obj*`, `str*` and `num*` prefixes as such and camelCase in Python and Dart are deliberate and were not flagged. `isBotAgent`, `isMobile` and `generateLicense` were redesigned in the same round and are not listed.

Most of the renames it found were made in the same month and are listed in each package's changelog; the items below are what was left. A rename is a breaking change in every package, so it goes under "Breaking changes" in each changelog with the line a user has to change, as `getParsedInfoFromAddress` did in 1.21.0. Citations use three prefixes: `js:` is `packages/javascript/lib/`, `dart:` is `packages/dart/lib/src/` and `py:` is `packages/python/qsu/`. A name followed by "(+ `param`)" means the parameter is part of the same item.

### High: the name says something the code does not do

- [ ] `ParsedAddress.host` (`parseAddress`) (`net`, JavaScript, Dart, Python). Holds the hostname without the port (`js:net/parseAddress.ts`): `https://example.com:8080` gives `host: 'example.com'`. In the WHATWG `URL` and in Python's `urlsplit().netloc` the host includes the port, and `protocol` is `'HTTPS'` rather than `'https:'`. Suggestion: Include `:port` in `host`, or drop it in favor of `hostname`.

### Medium: grammatically wrong or inconsistent with its siblings

- [ ] `DurationOptions.useShortString` (`format`, JavaScript, Dart, Python). Says what `FileSizeOptions.unitDisplay: 'short' | 'long'` already says, under a vaguer name. Suggestion: `unitDisplay: 'short' | 'long'`, defaulting to `'long'`.
- [ ] `len`, `sleep`, `contains`, `isEmpty` (`verify, misc`, Python, Dart). `max`, `min`, `sum` and `round` became `numMax`, `numMin`, `numSum` and `numRound`, but these four still clash: in Python, `from qsu import *` replaces `len`, whose qsu version returns `5` for `len(12345)` instead of raising a `TypeError`, and qsu's `sleep` takes milliseconds where `time.sleep` takes seconds. In Dart, `sleep` clashes with `dart:io`, and `contains` and `isEmpty` with `package:test`, which this repository's own tests hide. Suggestion: Document the clashes, or rename them in the next breaking round.
- [ ] `getRamSize`, `getFreeRamSize`, `getUsedRamSize`, `getDiskSize`, `getFreeDiskSize` (`os`, JavaScript, Dart, Python). Return a formatted string such as `'16 GB'`, rounded up with no decimals (`js:node/os/getRamSize.ts:5`), while `getFileSize` returns a number of bytes. The same `*Size` noun has two return types. Suggestion: Return bytes like `getFileSize` and let callers use `fileSizeFormat`; otherwise a `*SizeText` suffix.
- [ ] `isValidDate` (+ `dateYYYYMMDD`) (`date`, JavaScript, Dart, Python). A predicate that throws on any string not shaped `YYYY-MM-DD` (`js:date/isValidDate.ts:2-4`), so `if (isValidDate(input))` crashes on user input. Suggestion: Return `false` for other shapes. This is a behavior fix rather than a rename.

### Low: a better name that is not urgent

- [ ] `average`, `median`, `sortByObjectKey`, `sortNatural` (`array`, JavaScript, Dart, Python). The only `array` functions without the `arr` prefix, while `numSum`, `numMin` and `numMax` live in `math`. The prefix appears to mark a clash with another category (`arrCount` and `strCount`); either rule works, but only one should apply. Suggestion: Move `average` and `median` to `math` beside `sum`, or prefix all four.
- [ ] `getFileName.withExtension` (`file`, JavaScript, Dart, Python). The extension is dropped by default (`js:node/file/getFileName.ts:3`), unlike `basename` in Node, Python and Dart's `path`. Suggestion: Default `withExtension` to `true`, or call the current default `getFileStem`.
- [ ] `between` (`range`, `number`) (`verify`, JavaScript, Dart, Python). Takes the range before the value, the opposite of `clamp(value, min, max)` and lodash's `inRange(number, start, end)`. Suggestion: `between(value, range, inclusive)` in the next breaking release.
- [ ] `isEqualLoose.rightOperand`, `isEqualStrict.rightOperand` (`verify`, JavaScript, Python). A rest parameter named in the singular, and a different scheme from `isEqualDeep(left, right)`. Suggestion: `left, ...others` across the family.
- [ ] `getSlug` (+ `includeSpecial`) (`web`, JavaScript, Dart, Python). Transforms text rather than getting something. Python's `slugify` and the `strTo*Case` family are nearer names. Suggestion: `strToSlug` (or `slugify`); `includeSpecial` to `includeSpecialChars`.
- [ ] `duration` / `fileSizeFormat` (`format`, JavaScript, Dart, Python). The pairs are `duration`/`durationParts` and `fileSizeFormat`/`fileSizeParts`: one formatter carries the `Format` suffix and the other does not. Suggestion: `durationFormat`, or `fileSize`; pick one.

### Parameters that differ between the languages

Parameter names agree for nearly every function. The real difference left is the right operands of `isEqualLoose` and `isEqualStrict` in Dart; the other items pass the same name differently.

- [ ] `isEqualLoose`, `isEqualStrict`: JavaScript takes `leftOperand, ...rightOperand`, Dart `leftOperand, [right1, right2]` and Python `leftOperand, *rightOperand`. Dart takes at most two right operands unless they arrive as one list.
- [ ] `joinFilePath`: JavaScript takes `isWindows, ...paths`, Dart `paths, {isWindows}` and Python `isWindows, *paths`. Same names, different order and kind.
- [ ] `getDiskSize`, `getFreeDiskSize`, `getDiskUsage`: JavaScript takes `path` (positional), Dart `{path}` (named) and Python `path` (positional). Same name, different kind.
- [ ] `fileSizeFormat`, `getSlug`: JavaScript takes options object, Dart named parameters and Python flat keyword arguments only. Python takes no options dict here, unlike the other Python functions with options (CLAUDE.md describes both forms).
- [ ] `createFileOfSize`: JavaScript takes `size` (required), Dart `{int? size}` (optional, throws when missing) and Python `size` (required). Same name; Dart should make it a required positional.
- [ ] `arrChunk`: JavaScript takes `size = 1`, Dart `size` (required) and Python `size = 1`. Same name, different default.
- [ ] `arrFill`: JavaScript takes `length = 0`, Dart `length` (required) and Python `length = 0`. Same name, different default.
- [ ] `div`, `numMax`, `numMin`, `mul`, `sub`, `numSum`, `logBox`, `split`, `joinUrl`, `objMerge`, `arrIntersection`, `arrDifference`: JavaScript takes rest parameter, Dart one `List` parameter and Python `*args`. Names agree. Only the shape differs, which Dart requires.

`getMacAddress` and `getTimezone` exist only in JavaScript, and `printFull` only in Dart.

### Found while reading the code

- [ ] `docs/src/en/reference/verify/isUrl.md:3` calls the `.` that `requireDot` looks for a comma.
- [ ] The `emptyDirectory` reference page and its Dart doc comment (`dart:file.dart:108`) say only files are deleted, but subdirectories are deleted too.
- [ ] `isPlainObject` answers differently per language: a plain object in JavaScript, exactly `dict` in Python (so an `OrderedDict` fails) and any `Map` in Dart.
- [ ] The `fetchData` reference pages call the options parameter `httpRequestOptions`, while all three packages name it `options`.
- [ ] On Windows, the Dart `getComputerName` ignores `COMPUTERNAME`, which the JavaScript and Python versions read first.

The object helpers modeled on lodash (`objGet`, `objSet`, `objPick`, `objOmit`, `objPickBy`, `objMapKeys`, `objInvert`, `objClone`), the rounding functions, `clamp`, `words`, `deburr`, `escapeRegExp`, `escapeHtml`, the `strTo*Case` family, `debounce`, `throttle`, the hash functions, `parseAddress` and most `get*` functions in `os` were checked and read correctly.

## Bot, device and license follow-ups

- [ ] Check the AI bot names that only third-party directories list, about 110 of them, against the operators' own pages. xAI, ByteDance, DeepSeek, Alibaba, Baidu and Tencent publish no crawler documentation, so their names come from ai.robots.txt, Cloudflare Radar and Known Agents.
- [ ] Look up the current crawler names of Kakao (Daum) in Kakao's own documentation; `Daum` and `Daumoa` come from bot lists.
- [ ] Review the Cloudflare Radar and Known Agents entries that were left out because their purpose could not be confirmed, about 40 names such as `AIStoreShopperCheck`, `HarkBot`, `DesearchBot` and `TalarionSearchBot`.
- [ ] Refresh the bot lists in `.github/scripts/bots/bots.json` from the operators' pages and ai.robots.txt before a release. New AI crawlers appear every few months, and `Google-NotebookLM` was renamed `Google-GeminiNotebook` in 2026.
- [ ] Consider `getBotType(text)`, returning `search`, `aiSearch`, `aiAgent`, `aiTraining`, `other` or `null`, and `getDeviceTypeFromUA(userAgent)`, returning `mobile`, `tablet`, `desktop` or `null`, so a caller does not have to call several functions to sort one request.
- [ ] `LicenseOption` (`types`, JavaScript) is still singular, while the other option types are `HttpRequestOptions`, `UptimeOptions`, `DurationOptions` and `GetFontsOptions`. Suggestion: `LicenseOptions`.
- [ ] Consider an option in `generateLicense` for the line naming the program and what it does, which the FSF suggests putting above the GNU notices.
