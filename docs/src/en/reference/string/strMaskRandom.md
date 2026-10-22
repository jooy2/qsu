# strMaskRandom

Replace strings at random locations with a specified number of characters (default 1) with characters (default \*).

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'maskCount', type: 'number', required: true },
	{ name: 'maskChar', type: 'string', default: `'*'` }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
strMaskRandom('hello', 2, '#'); // e.g. '#el#o'
```

:::

::: lang dart

```dart
strMaskRandom('hello', 2, maskChar: '#'); // e.g. '#el#o'
```

:::

::: lang python

```python
strMaskRandom('hello', 2, '#')  # e.g. 'he##o'
strMaskRandom('hello', 2)  # e.g. '*ell*'
```

:::
