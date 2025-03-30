# sortByObjectKey <Badge type="tip" text="JavaScript" />

Sort array values by a specific key value in an array containing multiple objects. It does not affect the order or value of elements within an object.

If the `numerically` option is `true`, when sorting an array consisting of strings, it sorts first by the numbers contained in the strings, not by their names.

## Parameters

- `array::any[]`
- `key::string`
- `descending::boolean`
- `numerically::boolean`

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
const obj = [
	{
		aa: 1,
		bb: 'aaa',
		cc: 'hi1'
	},
	{
		aa: 4,
		bb: 'ccc',
		cc: 'hi10'
	},
	{
		aa: 2,
		bb: 'ddd',
		cc: 'hi2'
	},
	{
		aa: 3,
		bb: 'bbb',
		cc: 'hi11'
	}
];

sortByObjectKey(obj, 'aa');

/*
[
	{
		aa: 1,
		bb: 'aaa',
		cc: 'hi1'
	},
	{
		aa: 2,
		bb: 'ddd',
		cc: 'hi2'
	},
	{
		aa: 3,
		bb: 'bbb',
		cc: 'hi11'
	},
	{
		aa: 4,
		bb: 'ccc',
		cc: 'hi10'
	}
]
*/
```

:::
