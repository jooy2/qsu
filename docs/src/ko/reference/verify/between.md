# between <Lang dart js python />

첫 번째 인수가 두 번째 인수(`[min, max]`)의 범위 내에 있으면 `true`를 반환합니다. 최소값과 최대값이 범위 내에 있도록 하려면 세 번째 인수로 `true`를 전달합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'range', type: { js: '[number, number]', dart: 'List<num>', python: 'list[int]' }, required: true },
	{ name: 'number', type: { js: 'number', dart: 'num' }, required: true },
	{ name: 'inclusive', type: 'boolean', default: 'false', named: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
between([10, 20], 10); // Returns false
between([10, 20], 10, true); // Returns true
```

:::

::: lang dart

```dart
between([10, 20], 10); // Returns false
between([10, 20], 10, inclusive: true); // Returns true
```

:::

::: lang python

```python
between([10, 20], 10)  # Returns False
between([10, 20], 10, True)  # Returns True
```

:::
