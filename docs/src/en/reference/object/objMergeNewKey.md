# objMergeNewKey <Lang js />

Merge two object data into one object. The key to this method is to compare the two objects and add the newly added key data, if any.

If the value is different from the existing key, it is replaced with the changed value, If the arrays are the same length and the data type of the array is object, the new key is added by comparing the object keys again at the same array index for both objects.

For normal arrays (where the array data is not an object), it will keep the original values, but you can customize how the array is handled if you specify the following in the third argument `options`

```javascript
const obj1 = {};
const obj2 = {};
const options = {
	arrayAction: 'original' // option value: 'original' | 'replace' | 'append'
};

objMergeNewKey(obj1, obj2, options);
```

If `arrayAction` is not specified, `original` will be the default action. Each action does the following:

- `original`: Use an existing value
- `replace`: Use the new value
- `append`: Append new values to existing values (duplicates allowed)

You must specify the original value for the first argument and the object value containing the newly added key for the second argument.

## Parameters

- `obj::object`
- `obj2::object`
- `arrayAction::object?`: 'original' | 'replace' | 'append'

## Returns

> object|null

## Examples

```javascript
const result = objMergeNewKey(
	{
		a: 1,
		b: {
			a: 1
		},
		c: [1, 2]
	},
	{
		b: {
			b: 2
		},
		c: [3],
		d: 4
	}
);

console.log(result); // Returns { a: 1, b: { a: 1, b: 2 }, c: [1, 2], d: 4
```
