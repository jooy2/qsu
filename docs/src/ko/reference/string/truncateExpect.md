# truncateExpect <Lang dart js python />

이 문자열은 끝 문자(`endStringChar`)까지 잘림을 무시합니다. 예상 길이에 도달하면, 끝 문자 뒤의 잘린 문자열을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'expectLength', type: 'number', required: true },
	{ name: 'endStringChar', type: 'string', named: true, default: `'.'` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
truncateExpect('hello. this is test string.', 10, '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-'); // Returns 'hello-this-is-'
```

```dart [Dart]
truncateExpect('hello. this is test string.', 10, endStringChar: '.'); // Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, endStringChar: '-'); // Returns 'hello-this-is-'
```

```python [Python]
truncateExpect('hello. this is test string.', 10, '.')  # Returns 'hello. this is test string.'
truncateExpect('hello-this-is-test-string-bye', 14, '-')  # Returns 'hello-this-is-'
```

:::
