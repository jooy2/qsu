# objFlatten

Merges objects from the given object to the top level of the child items and displays the key names in steps, using a delimiter (`.` by default) instead of the existing keys. For example, if an object `a` has keys `b`, `c`, and `d`, the `a` key is not displayed, and the keys and values `a.b`, `a.c`, and `a.d` are displayed in the parent step.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true },
	{ name: 'separator', type: 'string', named: true, default: `'.'` }
]" />

## Returns

<ReturnType type="object" />

## Examples

::: lang js

```javascript
objFlatten({
	a: 1,
	b: {
		aa: 1,
		bb: 2
	},
	c: 3
});

/*
Returns:
{
	a: 1,
	'b.aa': 1,
	'b.bb': 2,
	c: 3
}
 */
```

:::

::: lang dart

```dart
objFlatten({
  'a': 1,
  'b': {
    'aa': 1,
		'bb': 2
  },
  'c': 3
});

/*
Returns:
{
	'a': 1,
	'b.aa': 1,
	'b.bb': 2,
	'c': 3
}
 */
```

:::

::: lang python

```python
objFlatten({
	'a': 1,
	'b': {
		'aa': 1,
		'bb': 2
	},
	'c': 3
})

#
# Returns:
# {
# 	'a': 1,
# 	'b.aa': 1,
# 	'b.bb': 2,
# 	'c': 3
# }
#
```

:::
