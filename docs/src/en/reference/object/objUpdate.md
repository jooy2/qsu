# objUpdate <Badge type="tip" text="JavaScript" />

Changes the value matching a specific key name in the given object. If the `recursive` option is `true`, it will also search in child object items. This changes the value of the same key found in both the parent and child items. If the `upsert` option is `true`, add it as a new attribute to the top-level item when the key is not found.

## Parameters

- `obj::object`
- `searchKey::string`
- `value::any`
- `recursive::boolean`
- `upsert::boolean`

## Returns

> object|null

## Examples

```javascript
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
