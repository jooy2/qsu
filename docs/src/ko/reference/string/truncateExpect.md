# truncateExpect <Lang dart js python />

이 문자열은 끝 문자(`endStringChar`)까지 잘림을 무시합니다. 예상 길이에 도달하면, 끝 문자 뒤의 잘린 문자열을 반환합니다.

끝 문자는 배열로 여러 개를 넘길 수 있으며, 예상 길이를 넘어가는 문장은 끝까지 온전히 유지됩니다.

기본값은 각 문자 체계의 마침표입니다. `.`, `。`(온점), `．`(전각), `｡`(반각)이 포함되므로, 일본어와 중국어 문장도 원문 그대로 반환되지 않고 각자의 마침표에서 잘립니다. `!`와 `?`는 의도적으로 제외했습니다. ASCII `!`가 지금까지 문장 끝으로 취급된 적이 없기 때문에, `！`만 받아들이면 같은 문장이 표기 문자 체계에 따라 다르게 잘리게 됩니다. 필요하다면 `['.', '!', '?', '。', '！', '？']`처럼 직접 넘기면 됩니다.

긴 끝 문자가 짧은 것보다 먼저 매칭되므로, `...` 옆에 `.`이 있어도 `...`이 중간에 잘리지 않습니다. 끝 문자를 찾지 못했거나 목록이 비어 있으면 문자열을 그대로 반환합니다.

`expectLength`는 코드 포인트 단위로 계산되므로, 기본 다국어 평면(BMP) 밖의 문자도 모든 언어에서 1자로 세어집니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: '자를 문자열입니다.' },
	{ name: 'expectLength', type: 'number', required: true, desc: '잘라낼 기준 길이이며, 코드 포인트 단위로 계산됩니다. 이 길이를 넘어가는 문장은 온전히 유지됩니다.' },
	{ name: 'endStringChar', type: 'string | string[]', named: true, default: `['.', '。', '．', '｡']`, desc: '끝 문자 또는 끝 문자의 배열입니다. 더 긴 쪽이 먼저 매칭되며, 빈 목록이면 문자열을 그대로 반환합니다.' }
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
