# Methods: Array

## `_.arrShuffle (any[])`

Shuffle the order of the given array and return.

- `array::any[]`

```javascript
_.arrShuffle([1, 2, 3, 4]); // Returns [4, 2, 3, 1]
```

## `_.arrWithDefault (any[])`

Initialize an array with a default value of a specific length.

- `defaultValue::any`
- `length::number || 0`

```javascript
_.arrWithDefault('abc', 4); // Returns ['abc', 'abc', 'abc', 'abc']
_.arrWithDefault(null, 3); // Returns [null, null, null]
```

## `_.arrWithNumber (number[])`

Creates and returns an Array in the order of start...end values.

- `start::number`
- `end::number`

```javascript
_.arrWithNumber(1, 3); // Returns [1, 2, 3]
_.arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
```

## `_.arrUnique (any[])`

Remove duplicate values from array and two-dimensional array data. In the case of 2d arrays, json type data duplication is not removed.

- `array::any[]`

```javascript
_.arrUnique([1, 2, 2, 3]); // Returns [1, 2, 3]
_.arrUnique([[1], [1], [2]]); // Returns [[1], [2]]
```

## `_.average (number)`

Returns the average of all numeric values in an array.

- `array::number[]`

```javascript
_.average([1, 5, 15, 50]); // Returns 17.75
```

## `_.arrMove (any[])`

Moves the position of a specific element in an array to the specified position. (Position starts from 0.)

- `array::any[]`
- `from::number`
- `to::number`

```javascript
_.arrMove([1, 2, 3, 4], 1, 0); // Returns [2, 1, 3, 4]
```

## `_.arrTo1dArray (any[])`

Merges all elements of a multidimensional array into a one-dimensional array.

- `array::any[]`

```javascript
_.arrTo1dArray([1, 2, [3, 4]], 5); // Returns [1, 2, 3, 4, 5]
```

## `_.arrRepeat (any[])`

Repeats the data of an `Array` or `Object` a specific number of times and returns it as a 1d array.

- `array::any[]|object`
- `count::number`

```javascript
_.arrRepeat([1, 2, 3, 4], 3); // Returns [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
_.arrRepeat({ a: 1, b: 2 }, 2); // Returns [{ a: 1, b: 2 }, { a: 1, b: 2 }]
```

## `_.arrCount (object)`

Returns the number of duplicates for each unique value in the given array. The array values can only be of type `String` or `Number`.

- `array::string[]|number[]`
- `count::number`

```javascript
_.arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

## `_.sortNumeric (string[])`

When sorting an array consisting of strings, it sorts first by the numbers contained in the strings, not by their names. For example, given the array `['1-a', '100-a', '10-a', '2-a']`, it returns `['1-a', '2-a', '10-a', '100-a']` with the smaller numbers at the front.

- `array::string[]`
- `descending::boolean`

```javascript
_.sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```
