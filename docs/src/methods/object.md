---
title: Object
order: 2
---

# Methods: Object

## `_.objToQueryString`

Converts the given object data to a URL query string.

### Parameters

- `obj::object`

### Returns

> string

### Examples

```javascript
_.objToQueryString({
	hello: 'world',
	test: 1234,
	arr: [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```

## `_.objToPrettyStr`

Recursively output all the steps of the JSON object (`JSON.stringify`) and then output the JSON object with newlines and tab characters to make it easier to read in a `console` function, for example.

### Parameters

- `obj::object`

### Returns

> string

### Examples

```javascript
_.objToPrettyStr({ a: 1, b: { c: 1, d: 2 } }); // Returns '{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
```

## `_.objFindItemRecursiveByKey`

Returns the object if the key of a specific piece of data in the object's dataset corresponds to a specific value. This function returns only one result, so it is used to search for unique IDs, including all of their children.

### Parameters

- `obj::object`
- `searchKey::string`
- `searchValue::any`
- `childKey::string`

### Returns

> object|null

### Examples

```javascript
_.objFindItemRecursiveByKey(
	{
		id: 123,
		name: 'parent',
		child: [
			{
				id: 456,
				name: 'childItemA'
			},
			{
				id: 789,
				name: 'childItemB'
			}
		]
	}, // obj
	'id', // searchKey
	456, // searchValue
	'child' // childKey
); // Returns '{ id: 456, name: 'childItemA' }'
```
