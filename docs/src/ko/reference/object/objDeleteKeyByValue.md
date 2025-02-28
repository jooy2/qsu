# objDeleteKeyByValue <Badge type="tip" text="JavaScript" />

Deletes keys equal to the given value from the object data. If the `recursive` option is `true`, also deletes all keys corresponding to the same value in the child items.

## Parameters

- `obj::object`
- `searchValue::string|number|null|undefined`
- `recursive::boolean`

## Returns

> object|null

## Examples

```javascript
const result = objDeleteKeyByValue(
	{
		a: 1,
		b: 2,
		c: {
			aa: 2,
			bb: {
				aaa: 1,
				bbb: 2
			}
		},
		d: {
			aa: 2
		}
	},
	2,
	true
);

console.log(result); // Returns { a: 1, c: { bb: { aaa: 1 } }, d: {} }
```
