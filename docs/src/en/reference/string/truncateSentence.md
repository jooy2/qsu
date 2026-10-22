# truncateSentence

The string ignores truncation until the ending character (`sentenceEnds`). If the expected length is reached, return the truncated string until after the ending character.

Several ending characters may be given as an array, and the whole sentence that crosses the expected length is still kept.

The default is the full stop as each script writes it — `.`, `。` (ideographic), `．` (fullwidth) and `｡` (halfwidth) — so Japanese and Chinese text is cut at its own period instead of being returned untouched. `!` and `?` are deliberately left out: an ASCII `!` has never ended a sentence here, so accepting `！` would split the same text differently depending on the script it is written in. Pass `['.', '!', '?', '。', '！', '？']` to opt in.

A longer ending character is matched before a shorter one, so `.` next to `...` does not cut `...` short. When no ending character is found, or the list is empty, the string is returned untouched.

`minLength` is counted in code points, so a character outside the Basic Multilingual Plane counts as one in every language.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The string to truncate.' },
	{ name: 'minLength', type: 'number', required: true, desc: 'The length to truncate at, counted in code points. The sentence that crosses it is kept whole.' },
	{ name: 'sentenceEnds', type: 'string | string[]', named: true, default: `['.', '。', '．', '｡']`, desc: 'The ending character, or an array of them. A longer one is matched first, and an empty list returns the string untouched.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
truncateSentence('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
truncateSentence('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
truncateSentence('これはテストです。よろしくお願いします。さようなら。', 10); // Returns 'これはテストです。よろしくお願いします。'
truncateSentence('你好。这是测试。再见。', 5); // Returns '你好。这是测试。'
truncateSentence('a. b! c? d.', 4, ['.', '!', '?']); // Returns 'a. b!'
```

:::

::: lang dart

```dart
truncateSentence('hello. this is test string.', 10, sentenceEnds: '.'); // Returns 'hello. this is test string.'
truncateSentence('hello-this-is-test-string-bye', 14, sentenceEnds: '-'); // Returns 'hello-this-is-'
truncateSentence('これはテストです。よろしくお願いします。さようなら。', 10); // Returns 'これはテストです。よろしくお願いします。'
truncateSentence('你好。这是测试。再见。', 5); // Returns '你好。这是测试。'
truncateSentence('a. b! c? d.', 4, sentenceEnds: ['.', '!', '?']); // Returns 'a. b!'
```

:::

::: lang python

```python
truncateSentence('hello. this is test string.', 10, '.')  # Returns 'hello. this is test string.'
truncateSentence('hello-this-is-test-string-bye', 14, '-')  # Returns 'hello-this-is-'
truncateSentence('これはテストです。よろしくお願いします。さようなら。', 10)  # Returns 'これはテストです。よろしくお願いします。'
truncateSentence('你好。这是测试。再见。', 5)  # Returns '你好。这是测试。'
truncateSentence('a. b! c? d.', 4, ['.', '!', '?'])  # Returns 'a. b!'
```

:::
