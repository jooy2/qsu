# truncateExpect <Lang dart js python />

The string ignores truncation until the ending character (`endStringChar`). If the expected length is reached, return the truncated string until after the ending character.

Several ending characters may be given as an array, and the whole sentence that crosses the expected length is still kept.

The default is the full stop as each script writes it — `.`, `。` (ideographic), `．` (fullwidth) and `｡` (halfwidth) — so Japanese and Chinese text is cut at its own period instead of being returned untouched. `!` and `?` are deliberately left out: an ASCII `!` has never ended a sentence here, so accepting `！` would split the same text differently depending on the script it is written in. Pass `['.', '!', '?', '。', '！', '？']` to opt in.

A longer ending character is matched before a shorter one, so `.` next to `...` does not cut `...` short. When no ending character is found, or the list is empty, the string is returned untouched.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: 'The string to truncate.' },
	{ name: 'expectLength', type: 'number', required: true, desc: 'The length to truncate at. The sentence that crosses it is kept whole.' },
	{ name: 'endStringChar', type: 'string | string[]', named: true, default: `['.', '。', '．', '｡']`, desc: 'The ending character, or an array of them. A longer one is matched first, and an empty list returns the string untouched.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
truncateExpect('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
truncateExpect('これはテストです。よろしくお願いします。さようなら。', 10); // Returns 'これはテストです。よろしくお願いします。'
truncateExpect('你好。这是测试。再见。', 5); // Returns '你好。这是测试。'
truncateExpect('a. b! c? d.', 4, ['.', '!', '?']); // Returns 'a. b!'
```

```dart [Dart]
truncateExpect('hello. this is test string.', 10, endStringChar: '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, endStringChar: '-'); // Returns 'hello-this-is-'
truncateExpect('これはテストです。よろしくお願いします。さようなら。', 10); // Returns 'これはテストです。よろしくお願いします。'
truncateExpect('你好。这是测试。再见。', 5); // Returns '你好。这是测试。'
truncateExpect('a. b! c? d.', 4, endStringChar: ['.', '!', '?']); // Returns 'a. b!'
```

```python [Python]
truncateExpect('hello. this is test string.', 10, '.')  # Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-')  # Returns 'hello-this-is-'
truncateExpect('これはテストです。よろしくお願いします。さようなら。', 10)  # Returns 'これはテストです。よろしくお願いします。'
truncateExpect('你好。这是测试。再见。', 5)  # Returns '你好。这是测试。'
truncateExpect('a. b! c? d.', 4, ['.', '!', '?'])  # Returns 'a. b!'
```

:::
