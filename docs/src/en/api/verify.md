---
title: Verify
order: 5
---

# API: Verify

## `isObject` <Badge type="tip" text="JavaScript" />

Check whether the given data is of type `Object`. Returns `false` for other data types including `Array`.

### Parameters

- `data::any`

### Returns

> boolean

### Examples

```javascript
isObject([1, 2, 3]); // Returns false
isObject({ a: 1, b: 2 }); // Returns true
```

## `isEqual` <Badge type="tip" text="JavaScript" />

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

isEqual('Left', 'Left', val1); // Returns true
isEqual(1, [1, '1', 1, val2]); // Returns true
isEqual(val1, ['Right', 'Left', 1]); // Returns false
isEqual(1, 1, 1, 1); // Returns true
```

## `isEqualStrict` <Badge type="tip" text="JavaScript" />

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

isEqualStrict('Left', 'Left', val1); // Returns true
isEqualStrict(1, [1, '1', 1, val2]); // Returns false
isEqualStrict(1, 1, '1', 1); // Returns false
```

## `isEmpty` <Badge type="tip" text="JavaScript" />

Returns true if the passed data is empty or has a length of 0.

### Parameters

- `data::any?`

### Returns

> boolean

### Examples

```javascript
isEmpty([]); // Returns true
isEmpty(''); // Returns true
isEmpty('abc'); // Returns false
```

## `isUrl` <Badge type="tip" text="JavaScript" />

Returns `true` if the given data is in the correct URL format. If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist. If strict is `true`, URLs without commas (`.`) return `false`.

### Parameters

- `url::string`
- `withProtocol::boolean || false`
- `strict::boolean || false`

### Returns

> boolean

### Examples

```javascript
isUrl('google.com'); // Returns false
isUrl('google.com', true); // Returns true
isUrl('https://google.com'); // Returns true
```

## `is2dArray` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns `true` if the given array is a two-dimensional array.

### Parameters

- `array::any[]`

### Returns

> boolean

### Examples

```javascript
is2dArray([1]); // Returns false
is2dArray([[1], [2]]); // Returns true
```

## `contains` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns `true` if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is `true`, it returns true only for an exact match.

### Parameters

- `str::any[]|string`
- `search::any[]|string`
- `exact::boolean || false` <span class="named">Dart:Named</span>

### Returns

> boolean

### Examples

```javascript
contains('abc', 'a'); // Returns true
contains('abc', 'd'); // Returns false
contains('abc', ['a', 'd']); // Returns true
```

## `between` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns `true` if the first argument is in the range of the second argument (`[min, max]`). To allow the minimum and maximum values to be in the range, pass `true` for the third argument.

### Parameters

- `range::[number, number]`
- `number::number`
- `inclusive::boolean || false` <span class="named">Dart:Named</span>

### Returns

> boolean

### Examples

```javascript
between([10, 20], 10); // Returns false
between([10, 20], 10, true); // Returns true
```

## `len` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns the length of any type of data. If the argument value is `null` or `undefined`, `0` is returned.

### Parameters

- `data::any`

### Returns

> boolean

### Examples

```javascript
len('12345'); // Returns 5
len([1, 2, 3]); // Returns 3
```

## `isEmail` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Checks if the given argument value is a valid email.

### Parameters

- `email::string`

### Returns

> boolean

### Examples

```javascript
isEmail('abc@def.com'); // Returns true
```

## `isTrueMinimumNumberOfTimes` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns `true` if the values given in the `conditions` array are true at least `minimumCount` times.

### Parameters

- `conditions::boolean[]`
- `minimumCount::number` <span class="named">Dart:Named</span>

### Returns

> boolean

### Examples

```javascript
const left = 1;
const right = 1 + 2;

isTrueMinimumNumberOfTimes([true, true, false], 2); // Returns true
isTrueMinimumNumberOfTimes([true, true, false], 3); // Returns false
isTrueMinimumNumberOfTimes([true, true, left === right], 3); // Returns false
```
