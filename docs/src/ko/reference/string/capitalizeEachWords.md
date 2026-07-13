# capitalizeEachWords <Lang dart js python />

모든 단어를 공백으로 대문자로 변환합니다. 자연적으로 인수가 참이면, 일부 특수한 경우(예: 전치사)만 소문자로 유지됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'natural', type: 'boolean', named: true, default: 'false' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

```dart [Dart]
capitalizeEachWords('abcd'); // Returns 'Abcd'
```

```python [Python]
capitalizeEachWords('abcd')  # Returns 'Abcd'
```

:::
