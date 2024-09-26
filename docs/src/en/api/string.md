---
title: String
order: 3
---

# API: String

## `trim` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Removes all whitespace before and after a string. Unlike JavaScript's `trim` function, it converts two or more spaces between sentences into a single space.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
_.trim('H e l l o     World'); // Returns 'H e l l o World'
```

```dart
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

## `removeSpecialChar` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.

### Parameters

- `str::string`
- `exceptionCharacters::string?` <span class="named">Dart:Named</span>

### Returns

> string

### Examples

```javascript
_.removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
_.removeSpecialChar('Hello-qsu, World!', ' -'); // Returns 'Hello-qsu World'
```

```dart
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', exceptionCharacters: ' -'); // Returns 'Hello-qsu World'
```

## `removeNewLine` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Removes `\n`, `\r` characters or replaces them with specified characters.

### Parameters

- `str::string`
- `replaceTo::string || ''` <span class="named">Dart:Named</span>

### Returns

> string

### Examples

```javascript
_.removeNewLine('ab\ncd'); // Returns 'abcd'
_.removeNewLine('ab\r\ncd', '-'); // Returns 'ab-cd'
```

```dart
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', replaceTo: '-'); // Returns 'ab-cd'
```

## `replaceBetween` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Replaces text within a range starting and ending with a specific character in a given string with another string. For example, given the string `abc<DEF>ghi`, to change `<DEF>` to `def`, use `replaceBetween('abc<DEF>ghi', '<', '>', 'def')`. The result would be `abcdefghi`.

Deletes strings in the range if `replaceWith` is not specified.

### Parameters

- `str::string`
- `startChar::string`
- `endChar::string`
- `replaceWith::string || ''`

### Returns

> string

### Examples

```javascript
_.replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
_.replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```

```dart
replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```

## `capitalizeFirst` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Converts the first letter of the entire string to uppercase and returns.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.capitalizeFirst('abcd'); // Returns 'Abcd'
```

```dart
capitalizeFirst('abcd'); // Returns 'Abcd'
```

## `capitalizeEverySentence` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.

### Parameters

- `str::string`
- `splitChar::string` <span class="named">Dart:Named</span>

### Returns

> string

### Examples

```javascript
_.capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
_.capitalizeEverySentence('hello!world', '!'); // Returns 'Hello!World'
```

```dart
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', splitChar: '!'); // Returns 'Hello!World'
```

## `capitalizeEachWords` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.

### Parameters

- `str::string`
- `natural::boolean || false` <span class="named">Dart:Named</span>

### Returns

> string

### Examples

```javascript
_.capitalizeEachWords('abcd'); // Returns 'Abcd'
```

```dart
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

## `strCount` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns the number of times the second String argument is contained in the first String argument.

### Parameters

- `str::string`
- `search::string`

### Returns

> number

### Examples

```javascript
_.strCount('abcabc', 'a'); // Returns 2
```

```dart
strCount('abcabc', 'a'); // Returns 2
```

## `strShuffle` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Randomly shuffles the received string and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.strShuffle('abcdefg'); // Returns 'bgafced'
```

```dart
strShuffle('abcdefg'); // Returns 'bgafced'
```

## `strRandom` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12.

### Parameters

- `length::number`
- `additionalCharacters::string?` <span class="named">Dart:Named</span>

### Returns

> string

### Examples

```javascript
_.strRandom(5); // Returns 'CHy2M'
```

```dart
strRandom(5); // Returns 'CHy2M'
```

## `strBlindRandom` <Badge type="tip" text="JavaScript" />

Replace strings at random locations with a specified number of characters (default 1) with characters (default \*).

### Parameters

- `str::string`
- `blindLength::number`
- `blindStr::string || '*'`

### Returns

> string

### Examples

```javascript
_.strBlindRandom('hello', 2, '#'); // Returns '#el#o'
```

## `truncate` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

### Parameters

- `str::string`
- `length::number`
- `ellipsis::string || ''` <span class="named">Dart:Named</span>

### Returns

> string

### Examples

```javascript
_.truncate('hello', 3); // Returns 'hel'
_.truncate('hello', 2, '...'); // Returns 'he...'
```

```dart
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```

## `truncateExpect` <Badge type="tip" text="JavaScript" />

The string ignores truncation until the ending character (`endStringChar`). If the expected length is reached, return the truncated string until after the ending character.

### Parameters

- `str::string`
- `expectLength::number`
- `endStringChar::string || '.'`

### Returns

> string

### Examples

```javascript
_.truncateExpect('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
_.truncateExpect('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
```

## `split` <Badge type="tip" text="JavaScript" />

Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.

### Parameters

- `str::string`
- `splitter::string||string[]||...string`

### Returns

> string[]

### Examples

```javascript
_.split('hello% js world', '% '); // Returns ['hello', 'js world']
_.split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
_.split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
_.split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

## `strUnique` <Badge type="tip" text="JavaScript" />

Remove duplicate characters from a given string and output only one.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.strUnique('aaabbbcc'); // Returns 'abc'
```

## `strToAscii` <Badge type="tip" text="JavaScript" />

Converts the given string to ascii code and returns it as an array.

### Parameters

- `str::string`

### Returns

> number[]

### Examples

```javascript
_.strToAscii('12345'); // Returns [49, 50, 51, 52, 53]
```

## `urlJoin` <Badge type="tip" text="JavaScript" />

Merges the given string argument with the first argument (the beginning of the URL), joining it so that the slash (`/`) symbol is correctly included.

### Parameters

- `args::any[]`

### Returns

> string

### Examples

```javascript
_.urlJoin('https://example.com', 'hello', 'world'); // Returns 'https://example.com/hello/world'
```
