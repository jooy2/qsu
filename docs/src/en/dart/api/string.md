---
title: String
order: 3
---

# API: String

## `trim`

Removes all whitespace before and after a string. Unlike JavaScript's `trim` function, it converts two or more spaces between sentences into a single space.

### Parameters

- `str::string`

### Returns

> string

### Examples

```dart
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

## `removeSpecialChar`

Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.

### Parameters

- `str::string` (Positional)
- Named: `exceptionCharacters::string?`

### Returns

> string

### Examples

```dart
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', exceptionCharacters: ' -'); // Returns 'Hello-qsu World'
```

## `removeNewLine`

Removes `\n`, `\r` characters or replaces them with specified characters.

### Parameters

- `str::string`
- Named: `replaceTo::string || ''`

### Returns

> string

### Examples

```dart
removeNewLine('ab\ncd'); // Returns 'abcd'
removeNewLine('ab\r\ncd', replaceTo: '-'); // Returns 'ab-cd'
```

## `replaceBetween`

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

```dart
replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```

## `capitalizeFirst`

Converts the first letter of the entire string to uppercase and returns.

### Parameters

- `str::string`

### Returns

> string

### Examples

```dart
capitalizeFirst('abcd'); // Returns 'Abcd'
```

## `capitalizeEverySentence`

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.

### Parameters

- `str::string`
- Named: `splitChar::string`

### Returns

> string

### Examples

```dart
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', splitChar: '!'); // Returns 'Hello!World'
```

## `capitalizeEachWords`

Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.

### Parameters

- `str::string`
- Named: `natural::boolean || false`

### Returns

> string

### Examples

```dart
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

## `strCount`

Returns the number of times the second String argument is contained in the first String argument.

### Parameters

- `str::string`
- `search::string`

### Returns

> number

### Examples

```dart
strCount('abcabc', 'a'); // Returns 2
```

## `strShuffle`

Randomly shuffles the received string and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```dart
strShuffle('abcdefg'); // Returns 'bgafced'
```

## `strRandom`

Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12.

### Parameters

- `length::number`
- Named: `additionalCharacters::string?`

### Returns

> string

### Examples

```dart
strRandom(5); // Returns 'CHy2M'
```

## `truncate`

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

### Parameters

- `str::string`
- `length::number`
- Named: `ellipsis::string || ''`

### Returns

> string

### Examples

```dart
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```
