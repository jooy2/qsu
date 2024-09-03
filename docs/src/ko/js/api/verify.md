---
title: Verify
order: 5
---

# API: Verify

## `_.isObject`

Check whether the given data is of type `Object`. Returns `false` for other data types including `Array`.

### Parameters

- `data::any`

### Returns

> boolean

### Examples

```javascript
_.isObject([1, 2, 3]); // Returns false
_.isObject({ a: 1, b: 2 }); // Returns true
```

## `_.isEqual`

It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.

`isEqual` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.

### Parameters

- `leftOperand::any`
- `rightOperand::any||any[]||...any`

### Returns

> boolean

### Examples

```javascript
const val1 = 'Left';
const val2 = 1;

_.isEqual('Left', 'Left', val1); // Returns true
_.isEqual(1, [1, '1', 1, val2]); // Returns true
_.isEqual(val1, ['Right', 'Left', 1]); // Returns false
_.isEqual(1, 1, 1, 1); // Returns true
```

## `_.isEqualStrict`

It compares the first argument value as the left operand and the argument values given thereafter as the right operand, and returns `true` if the values are all the same.

`isEqual` returns `true` even if the data types do not match, but `isEqualStrict` returns `true` only when the data types of all argument values match.

### Parameters

- `leftOperand::any`
- `rightOperand::any||any[]||...any`

### Returns

> boolean

### Examples

```javascript
const val1 = 'Left';
const val2 = 1;

_.isEqualStrict('Left', 'Left', val1); // Returns true
_.isEqualStrict(1, [1, '1', 1, val2]); // Returns false
_.isEqualStrict(1, 1, '1', 1); // Returns false
```

## `_.isEmpty`

Returns true if the passed data is empty or has a length of 0.

### Parameters

- `data::any?`

### Returns

> boolean

### Examples

```javascript
_.isEmpty([]); // Returns true
_.isEmpty(''); // Returns true
_.isEmpty('abc'); // Returns false
```

## `_.isUrl`

Returns `true` if the given data is in the correct URL format. If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist. If strict is `true`, URLs without commas (`.`) return `false`.

### Parameters

- `url::string`
- `withProtocol::boolean || false`
- `strict::boolean || false`

### Returns

> boolean

### Examples

```javascript
_.isUrl('google.com'); // Returns false
_.isUrl('google.com', true); // Returns true
_.isUrl('https://google.com'); // Returns true
```

## `_.contains`

Returns `true` if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is `true`, it returns true only for an exact match.

### Parameters

- `str::any[]|string`
- `search::any[]|string`
- `exact::boolean || false`

### Returns

> boolean

### Examples

```javascript
_.contains('abc', 'a'); // Returns true
_.contains('abc', 'd'); // Returns false
_.contains('abc', ['a', 'd']); // Returns true
```

## `_.is2dArray`

Returns `true` if the given array is a two-dimensional array.

### Parameters

- `array::any[]`

### Returns

> boolean

### Examples

```javascript
_.is2dArray([1]); // Returns false
_.is2dArray([[1], [2]]); // Returns true
```

## `_.between`

Returns `true` if the first argument is in the range of the second argument (`[min, max]`). To allow the minimum and maximum values to be in the range, pass `true` for the third argument.

### Parameters

- `range::[number, number]`
- `number::number`
- `inclusive::boolean || false`

### Returns

> boolean

### Examples

```javascript
_.between([10, 20], 10); // Returns false
_.between([10, 20], 10, true); // Returns true
```

## `_.len`

Returns the length of any type of data. If the argument value is `null` or `undefined`, `0` is returned.

### Parameters

- `data::any`

### Returns

> boolean

### Examples

```javascript
_.len('12345'); // Returns 5
_.len([1, 2, 3]); // Returns 3
```

## `_.isEmail`

Checks if the given argument value is a valid email.

### Parameters

- `email::string`

### Returns

> boolean

### Examples

```javascript
_.isEmail('abc@def.com'); // Returns true
```

## `_.isTrueMinimumNumberOfTimes`

Returns `true` if the values given in the `conditions` array are true at least `minimumCount` times.

### Parameters

- `conditions::boolean[]`
- `minimumCount::number`

### Returns

> boolean

### Examples

```javascript
const left = 1;
const right = 1 + 2;

_.isTrueMinimumNumberOfTimes([true, true, false], 2); // Returns true
_.isTrueMinimumNumberOfTimes([true, true, false], 3); // Returns false
_.isTrueMinimumNumberOfTimes([true, true, left === right], 3); // Returns false
```
