# strCount <Lang dart js python />

첫 번째 String 인자에 두 번째 String 인자가 포함된 횟수를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'search', type: 'string', required: true }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
strCount('abcabc', 'a'); // Returns 2
```

:::

::: lang dart

```dart
strCount('abcabc', 'a'); // Returns 2
```

:::

::: lang python

```python
strCount('abcabc', 'a')  # Returns 2
```

:::
