# today <Lang js dart python />

오늘 날짜를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'separator', type: 'string', named: true, default: `'-'` },
	{ name: 'yearFirst', type: 'boolean', named: true, default: 'true' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
today(); // Returns YYYY-MM-DD
today('/'); // Returns YYYY/MM/DD
today('/', false); // Returns DD/MM/YYYY
```

```dart [Dart]
today(); // Returns YYYY-MM-DD
today(separator: '/'); // Returns YYYY/MM/DD
today(separator: '/', yearFirst: false); // Returns DD/MM/YYYY
```

```python [Python]
today()  # Returns YYYY-MM-DD
today('/')  # Returns YYYY/MM/DD
today('/', False)  # Returns MM/DD/YYYY
```

:::
