# strBlindRandom <Lang js python />

Replace strings at random locations with a specified number of characters (default 1) with characters (default \*).

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'blindLength', type: 'number', required: true },
	{ name: 'blindStr', type: 'string', default: `'*'` }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
strBlindRandom('hello', 2, '#'); // Returns '#el#o'
```

:::

::: lang python

```python
strBlindRandom('hello', 2, '#')  # e.g. 'he##o'
strBlindRandom('hello', 2)  # e.g. '*ell*'
```

:::
