# Methods: String

## `_.trim (string)`

Removes leading and trailing spaces, and returns a value converted from two or more spaces between strings to one space. If the removeAllSpace value is true, all spaces including one space are removed.

- `str::string`
- `removeAllSpace::boolean`

```javascript
_.trim(' Hello Wor  ld '); // Returns 'Hello World'
_.trim('H e l l o     World', true); // Returns 'HelloWorld'
```

## `_.removeSpecialChar (string)`

Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.

- `str::string`
- `exceptionCharacters::string?`

```javascript
_.removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
_.removeSpecialChar('Hello-qsu, World!', ' -'); // Returns 'Hello-qsu World'
```

## `_.removeNewLine (string)`

Removes `\n`, `\r` characters or replaces them with specified characters.

- `str::string`
- `replaceTo::string || ''`

```javascript
_.removeNewLine('ab\ncd'); // Returns 'abcd'
_.removeNewLine('ab\r\ncd', '-'); // Returns 'ab-cd'
```

## `_.capitalizeFirst (string)`

Converts the first letter of the entire string to uppercase and returns.

- `str::string`

```javascript
_.capitalizeFirst('abcd'); // Returns 'Abcd'
```

## `_.capitalizeEverySentence (string)`

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.

- `str::string`
- `splitChar::string`

```javascript
_.capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
_.capitalizeEverySentence('hello!world', '!'); // Returns 'Hello!World'
```

## `_.capitalizeEachWords (string)`

Converts every word with spaces to uppercase. If the naturally argument is true, only some special cases (such as prepositions) are kept lowercase.

- `str::string`
- `natural::boolean || false`

```javascript
_.capitalizeEachWords('abcd'); // Returns 'Abcd'
```

## `_.strCount (number)`

Returns the number of times the second String argument is contained in the first String argument.

- `str::string`
- `search::string`

```javascript
_.strCount('abcabc', 'a'); // Returns 2
```

## `_.strShuffle (string)`

Randomly shuffles the received string and returns it.

- `str::string`

```javascript
_.strShuffle('abcdefg'); // Returns 'bgafced'
```

## `_.strRandom (string)`

Returns a random String containing numbers or uppercase and lowercase letters of the given length. The default return length is 12.

- `length::number`
- `additionalCharacters::string?`

```javascript
_.strRandom(5); // Returns 'CHy2M'
```

## `_.strBlindRandom (string)`

Replace strings at random locations with a specified number of characters (default 1) with characters (default \*).

- `str::string`
- `blindLength::number`
- `blindStr::string || '*'`

```javascript
_.strBlindRandom('hello', 2, '#'); // Returns '#el#o'
```

## `_.truncate (string)`

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

- `str::string`
- `length::number`
- `ellipsis::string || ''`

```javascript
_.truncate('hello', 3); // Returns 'hel'
_.truncate('hello', 2, '...'); // Returns 'he...'
```

## `_.truncateExpect (string)`

The string ignores truncation until the ending character (`endStringChar`). If the expected length is reached, return the truncated string until after the ending character.

- `str::string`
- `expectLength::number`
- `endStringChar::string || '.'`

```javascript
_.truncateExpect('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
_.truncateExpect('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
```

## `_.split (string[])`

Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.

- `str::string`
- `splitter::string||string[]||...string`

```javascript
_.split('hello% js world', '% '); // Returns ['hello', 'js world']
_.split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
_.split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
_.split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

## `_.encrypt (string)`

Encrypt with the algorithm of your choice (algorithm default: `aes-256-cbc`, ivSize default: `16`) using a string and a secret (secret).

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`
- `ivSize::number || 16`

```javascript
_.encrypt('test', 'secret-key');
```

## `_.decrypt (string)`

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`

```javascript
_.decrypt('61ba43b65fc...', 'secret-key');
```

## `_.md5 (string)`

Converts String data to md5 hash value and returns it.

- `str::string`

```javascript
_.md5('test'); // Returns '098f6bcd4621d373cade4e832627b4f6'
```

## `_.sha1 (string)`

Converts String data to sha1 hash value and returns it.

- `str::string`

```javascript
_.sha1('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

## `_.sha256 (string)`

Converts String data to sha256 hash value and returns it.

- `str::string`

```javascript
_.sha256('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

## `_.encodeBase64 (string)`

Base64-encode the given string.

- `str::string`

```javascript
_.encodeBase64('this is test'); // Returns 'dGhpcyBpcyB0ZXN0'
```

## `_.decodeBase64 (string)`

Decodes an encoded base64 string to a plain string.

- `encodedStr::string`

```javascript
_.decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

## `_.strUnique (string)`

Remove duplicate characters from a given string and output only one.

- `str::string`

```javascript
_.strUnique('aaabbbcc'); // Returns 'abc'
```

## `_.strToAscii (number[])`

Converts the given string to ascii code and returns it as an array.

- `str::string`

```javascript
_.strToAscii('12345'); // Returns [49, 50, 51, 52, 53]
```
