# today <Lang js dart python />

Returns today's date.

## Parameters

<ParamsTable :rows="[
	{ name: 'separator', type: 'string', named: true, default: `'-'` },
	{ name: 'yearFirst', type: 'boolean', named: true, default: 'true' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
today(); // Returns YYYY-MM-DD
today('/'); // Returns YYYY/MM/DD
today('/', false); // Returns DD/MM/YYYY
```

:::

::: lang dart

```dart
today(); // Returns YYYY-MM-DD
today(separator: '/'); // Returns YYYY/MM/DD
today(separator: '/', yearFirst: false); // Returns DD/MM/YYYY
```

:::

::: lang python

```python
today()  # Returns YYYY-MM-DD
today('/')  # Returns YYYY/MM/DD
today('/', False)  # Returns MM/DD/YYYY
```

:::
