---
title: Array
order: 1
---

# API: Array

## `arrShuffle` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Shuffle the order of the given array and return.

### Parameters

- `array::any[]`

### Returns

> any[]

### Examples

```javascript
_.arrShuffle([1, 2, 3, 4]); // Returns [4, 2, 3, 1]
```

## `arrWithDefault` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Initialize an array with a default value of a specific length.

### Parameters

- `defaultValue::any`
- `length::number || 0`

### Returns

> any[]

### Examples

```javascript
_.arrWithDefault('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
_.arrWithDefault(null, 3); // Returns [null, null, null]
```

## `arrWithNumber` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Creates and returns an Array in the order of start...end values.

### Parameters

- `start::number`
- `end::number`

### Returns

> number[]

### Examples

```javascript
_.arrWithNumber(1, 3); // Returns [1, 2, 3]
_.arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

## `arrUnique` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed.

### Parameters

- `array::any[]`

### Returns

> any[]

### Examples

```javascript
_.arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
_.arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

## `average` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns the average of all numeric values in an array.

### Parameters

- `array::number[]`

### Returns

> number

### Examples

```javascript
_.average([1, 5, 15, 50]); // Returns 17.75
```

## `arrMove` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Moves the position of a specific element in an array to the specified position. (Position starts from 0.)

### Parameters

- `array::any[]`
- `from::number`
- `to::number`

### Returns

> any[]

### Examples

```javascript
_.arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

## `arrTo1dArray` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Merges all elements of a multidimensional array into a one-dimensional array.

### Parameters

- `array::any[]`

### Returns

> any[]

### Examples

```javascript
_.arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

## `arrRepeat` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Repeats the data of an `Array` or `Object` a specific number of times and returns it as a 1d array.

### Parameters

- `array::any[]|object`
- `count::number`

### Returns

> any[]

### Examples

```javascript
_.arrRepeat([1, 2, 3, 4], 3); // Returns [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
_.arrRepeat({ a: 1, b: 2 }, 2); // Returns [{ a: 1, b: 2 }, { a: 1, b: 2 }]
```

## `arrCount` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns the number of duplicates for each unique value in the given array. The array values can only be of type `String` or `Number`.

### Parameters

- `array::string[]|number[]`
- `count::number`

### Returns

> object

### Examples

```javascript
_.arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

## `sortByObjectKey` <Badge type="tip" text="JavaScript" />

Sort array values by a specific key value in an array containing multiple objects. It does not affect the order or value of elements within an object.

If the `numerically` option is `true`, when sorting an array consisting of strings, it sorts first by the numbers contained in the strings, not by their names.

### Parameters

- `array::any[]`
- `key::string`
- `descending::boolean`
- `numerically::boolean`

### Returns

> any[]

### Examples

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

_.sortByObjectKey(obj, 'aa');

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

## `sortNumeric` <Badge type="tip" text="JavaScript" />

When sorting an array consisting of strings, it sorts first by the numbers contained in the strings, not by their names. For example, given the array `['1-a', '100-a', '10-a', '2-a']`, it returns `['1-a', '2-a', '10-a', '100-a']` with the smaller numbers at the front.

### Parameters

- `array::string[]`
- `descending::boolean`

### Returns

> string[]

### Examples

```javascript
_.sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

## `arrGroupByMaxCount` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Separates the data in the given array into a two-dimensional array containing only the maximum number of elements. For example, if you have an array of 6 data in 2 groups, this function will create a 2-dimensional array with 3 lengths.

### Parameters

- `array::any[]`
- `maxLengthPerGroup::number`

### Returns

> any[]

### Examples

```javascript
_.arrGroupByMaxCount(['a', 'b', 'c', 'd', 'e'], 2);
// Returns [['a', 'b'], ['c', 'd'], ['e']]
```
