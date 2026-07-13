# objUpdate <Lang js python />

Changes the value matching a specific key name in the given object. If the `recursive` option is `true`, it will also search in child object items. This changes the value of the same key found in both the parent and child items. If the `upsert` option is `true`, add it as a new attribute to the top-level item when the key is not found.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true },
	{ name: 'searchKey', type: 'string', required: true },
	{ name: 'value', type: 'any', required: true },
	{ name: 'recursive', type: 'boolean', default: 'false' },
	{ name: 'upsert', type: 'boolean', default: 'false' }
]" />

## Returns

> object|null

## Examples

::: code-group

```javascript [JavaScript]
const result = objUpdate(
	{
		a: 1,
		b: {
			a: 1,
			b: 2,
			c: 3
		},
		c: 3
	},
	'c',
	5,
	true,
	false
);

console.log(result); // Returns { a: 1, b: { a: 1, b: 2, c: 5 }, c: 5 }
```

```python [Python]
result = objUpdate(
	{
		'a': 1,
		'b': {
			'a': 1,
			'b': 2,
			'c': 3
		},
		'c': 3
	},
	'c',
	5,
	True,
	False
)

print(result)  # Returns { 'a': 1, 'b': { 'a': 1, 'b': 2, 'c': 5 }, 'c': 5 }
```

:::
