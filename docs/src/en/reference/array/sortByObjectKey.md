# sortByObjectKey

Sort array values by a specific key value in an array containing multiple objects. It does not affect the order or value of elements within an object.

If the `natural` option is `true`, when sorting an array consisting of strings, it sorts first by the numbers contained in the strings, not by their names. That ordering is the one [sortNatural](/reference/array/sortNatural) describes.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true },
	{ name: 'key', type: 'string', required: true },
	{ name: 'descending', type: 'boolean', default: 'false' },
	{ name: 'natural', type: 'boolean', default: 'false' }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
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

::: lang dart

```dart
final List<Map<String, dynamic>> files = [
  {'name': 'File-10'},
  {'name': 'File-9'},
  {'name': 'File-1'},
];

sortByObjectKey(files, 'name');
// Returns [{name: File-1}, {name: File-10}, {name: File-9}]
sortByObjectKey(files, 'name', natural: true);
// Returns [{name: File-1}, {name: File-9}, {name: File-10}]
sortByObjectKey(files, 'name', natural: true, descending: true);
// Returns [{name: File-10}, {name: File-9}, {name: File-1}]
```

:::

::: lang python

```python
obj = [
	{
		'aa': 1,
		'bb': 'aaa',
		'cc': 'hi1'
	},
	{
		'aa': 4,
		'bb': 'ccc',
		'cc': 'hi10'
	},
	{
		'aa': 2,
		'bb': 'ddd',
		'cc': 'hi2'
	},
	{
		'aa': 3,
		'bb': 'bbb',
		'cc': 'hi11'
	}
]

sortByObjectKey(obj, 'aa')

# [
# 	{
# 		'aa': 1,
# 		'bb': 'aaa',
# 		'cc': 'hi1'
# 	},
# 	{
# 		'aa': 2,
# 		'bb': 'ddd',
# 		'cc': 'hi2'
# 	},
# 	{
# 		'aa': 3,
# 		'bb': 'bbb',
# 		'cc': 'hi11'
# 	},
# 	{
# 		'aa': 4,
# 		'bb': 'ccc',
# 		'cc': 'hi10'
# 	}
# ]
```

:::
