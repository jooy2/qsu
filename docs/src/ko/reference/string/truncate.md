# truncate <Lang dart js python />

긴 문자열을 지정된 길이로 잘라내고, 문자열 뒤에 선택적으로 줄임표를 추가합니다.

길이는 코드 포인트 단위로 계산되므로, 기본 다국어 평면(BMP) 밖의 문자도 모든 언어에서 1자로 세어지며 중간에서 잘리지 않습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true, desc: '자를 문자열입니다.' },
	{ name: 'length', type: 'number', required: true, desc: '잘라낼 길이이며, 코드 포인트 단위로 계산됩니다.' },
	{ name: 'ellipsis', type: 'string', named: true, default: `''`, desc: '문자열 뒤에 덧붙일 값이며, 실제로 잘렸을 때만 추가됩니다.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, '...'); // Returns 'he...'
```

```dart [Dart]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```

```python [Python]
truncate('hello', 3)  # Returns 'hel'
truncate('hello', 2, '...')  # Returns 'he...'
```

:::
