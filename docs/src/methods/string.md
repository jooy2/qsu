---
title: String
order: 2
---

# Methods: String

## `_.trim`

Removes leading and trailing spaces, and returns a value converted from two or more spaces between strings to one space. If the removeAllSpace value is true, all spaces including one space are removed.

### Parameters

- `str::string`
- `removeAllSpace::boolean`

### Returns

> string

### Examples

```javascript
_.trim(' Hello Wor  ld '); // Returns 'Hello World'
_.trim('H e l l o     World', true); // Returns 'HelloWorld'
```

## `_.removeSpecialChar`

Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.

### Parameters

- `str::string`
- `exceptionCharacters::string?`

### Returns

> string

### Examples

```javascript
_.removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
_.removeSpecialChar('Hello-qsu, World!', ' -'); // Returns 'Hello-qsu World'
```

## `_.removeNewLine`

Removes `\n`, `\r` characters or replaces them with specified characters.

### Parameters

- `str::string`
- `replaceTo::string || ''`

### Returns

> string

### Examples

```javascript
_.removeNewLine('ab\ncd'); // Returns 'abcd'
_.removeNewLine('ab\r\ncd', '-'); // Returns 'ab-cd'
```

## `_.replaceBetween`

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

## `_.capitalizeFirst`

Converts the first letter of the entire string to uppercase and returns.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.capitalizeFirst('abcd'); // Returns 'Abcd'
```

## `_.capitalizeEverySentence`

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.

### Parameters

- `str::string`
- `splitChar::string`

### Returns

> string

### Examples

```javascript
_.capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
_.capitalizeEverySentence('hello!world', '!'); // Returns 'Hello!World'
```

## `_.capitalizeEachWords`

Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.

### Parameters

- `str::string`
- `natural::boolean || false`

### Returns

> string

### Examples

```javascript
_.capitalizeEachWords('abcd'); // Returns 'Abcd'
```

## `_.strCount`

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

## `_.strShuffle`

Randomly shuffles the received string and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.strShuffle('abcdefg'); // Returns 'bgafced'
```

## `_.strRandom`

Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12.

### Parameters

- `length::number`
- `additionalCharacters::string?`

### Returns

> string

### Examples

```javascript
_.strRandom(5); // Returns 'CHy2M'
```

## `_.strBlindRandom`

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

## `_.truncate`

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

### Parameters

- `str::string`
- `length::number`
- `ellipsis::string || ''`

### Returns

> string

### Examples

```javascript
_.truncate('hello', 3); // Returns 'hel'
_.truncate('hello', 2, '...'); // Returns 'he...'
```

## `_.truncateExpect`

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

## `_.split`

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

## `_.encrypt`

Encrypt with the algorithm of your choice (algorithm default: `aes-256-cbc`, ivSize default: `16`) using a string and a secret (secret).

### Parameters

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`
- `ivSize::number || 16`

### Returns

> string

### Examples

```javascript
_.encrypt('test', 'secret-key');
```

## `_.decrypt`

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

### Parameters

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`

### Returns

> string

### Examples

```javascript
_.decrypt('61ba43b65fc...', 'secret-key');
```

## `_.objectId`

Returns a random string hash of the ObjectId format (primarily utilized by MongoDB).

### Parameters

No parameters required

### Returns

> string

### Examples

```javascript
_.objectId(); // Returns '651372605b49507aea707488'
```

## `_.md5`

Converts String data to md5 hash value and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.md5('test'); // Returns '098f6bcd4621d373cade4e832627b4f6'
```

## `_.sha1`

Converts String data to sha1 hash value and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.sha1('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

## `_.sha256`

Converts String data to sha256 hash value and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.sha256('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

## `_.encodeBase64`

Base64-encode the given string.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.encodeBase64('this is test'); // Returns 'dGhpcyBpcyB0ZXN0'
```

## `_.decodeBase64`

Decodes an encoded base64 string to a plain string.

### Parameters

- `encodedStr::string`

### Returns

> string

### Examples

```javascript
_.decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

## `_.strToNumberHash`

Returns the specified string as a hash value of type number. The return value can also be negative.

### Parameters

- `str::string`

### Returns

> number

### Examples

```javascript
_.strToNumberHash('abc'); // Returns 96354
_.strToNumberHash('Hello'); // Returns 69609650
_.strToNumberHash('hello'); // Returns 99162322
```

## `_.strUnique`

Remove duplicate characters from a given string and output only one.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.strUnique('aaabbbcc'); // Returns 'abc'
```

## `_.strToAscii`

Converts the given string to ascii code and returns it as an array.

### Parameters

- `str::string`

### Returns

> number[]

### Examples

```javascript
_.strToAscii('12345'); // Returns [49, 50, 51, 52, 53]
```
