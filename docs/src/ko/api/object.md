---
title: Object
order: 2
---

# API: Object

## `objToQueryString` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Converts the given object data to a URL query string.

### Parameters

- `obj::object`

### Returns

> string

### Examples

```javascript
objToQueryString({
	hello: 'world',
	test: 1234,
	arr: [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```

## `objToPrettyStr` <Badge type="tip" text="JavaScript" />

Recursively output all the steps of the JSON object (`JSON.stringify`) and then output the JSON object with newlines and tab characters to make it easier to read in a `console` function, for example.

### Parameters

- `obj::object`

### Returns

> string

### Examples

```javascript
objToPrettyStr({ a: 1, b: { c: 1, d: 2 } }); // Returns '{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
```

## `objFindItemRecursiveByKey` <Badge type="tip" text="JavaScript" />

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
objFindItemRecursiveByKey(
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

## `objToArray` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Converts the given object to array format. The resulting array is a two-dimensional array with one key value stored as follows: `[key, value]`. If the `recursive` option is `true`, it will convert to a two-dimensional array again when the value is of type `object`.

### Parameters

- `obj::object`
- `recursive::boolean`

### Returns

> any[]

### Examples

```javascript
objToArray({
	a: 1.234,
	b: 'str',
	c: [1, 2, 3],
	d: { a: 1 }
}); // Returns [['a', 1.234], ['b', 'str'], ['c', [1, 2, 3]], ['d', { a: 1 }]]
```

## `objTo1d` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Merges objects from the given object to the top level of the child items and displays the key names in steps, using a delimiter (`.` by default) instead of the existing keys. For example, if an object `a` has keys `b`, `c`, and `d`, the `a` key is not displayed, and the keys and values `a.b`, `a.c`, and `a.d` are displayed in the parent step.

### Parameters

- `obj::object`
- `separator::string` <span class="named">Dart:Named</span>

### Returns

> object

### Examples

```javascript
objToArray({
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

## `objDeleteKeyByValue` <Badge type="tip" text="JavaScript" />

Deletes keys equal to the given value from the object data. If the `recursive` option is `true`, also deletes all keys corresponding to the same value in the child items.

### Parameters

- `obj::object`
- `searchValue::string|number|null|undefined`
- `recursive::boolean`

### Returns

> object|null

### Examples

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

## `objUpdate` <Badge type="tip" text="JavaScript" />

Changes the value matching a specific key name in the given object. If the `recursive` option is `true`, it will also search in child object items. This changes the value of the same key found in both the parent and child items. If the `upsert` option is `true`, add it as a new attribute to the top-level item when the key is not found.

### Parameters

- `obj::object`
- `searchKey::string`
- `value::any`
- `recursive::boolean`
- `upsert::boolean`

### Returns

> object|null

### Examples

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

## `objMergeNewKey` <Badge type="tip" text="JavaScript" />

Merge two object data into one object. The key to this method is to compare the two objects and add the newly added key data, if any.

If the value is different from the existing key, it is replaced with the changed value, If the arrays are the same length and the data type of the array is object, the new key is added by comparing the object keys again at the same array index for both objects.

일반적인 배열(배열 데이터가 객체가 아닌)의 경우 원본 값을 유지하도록 하지만, 세번째 인자 `options`에 다음과 같이 지정할 경우 배열의 처리 방법을 사용자 지정할 수 있습니다.

```javascript
const obj1 = {};
const obj2 = {};
const options = {
	arrayAction: 'original' // option value: 'original' | 'replace' | 'append'
};

objMergeNewKey(obj1, obj2, options);
```

`arrayAction`을 지정하지 않을 경우 `original`이 기본 동작이 됩니다. 각 동작은 다음 역할을 합니다:

- `original`: 기존 값을 사용
- `replace`: 새 값을 사용
- `append`: 기존 값에 새 값을 append (중복 허용)

You must specify the original value for the first argument and the object value containing the newly added key for the second argument.

### Parameters

- `obj::object`
- `obj2::object`
- `arrayAction::object?`: 'original' | 'replace' | 'append'

### Returns

> object|null

### Examples

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
