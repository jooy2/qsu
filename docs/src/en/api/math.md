---
title: Math
order: 4
---

# API: Math

## `numRandom` <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns a random number (Between min and max).

### Parameters

- `min::number`
- `max::number`

### Returns

> number

### Examples

```javascript
numRandom(1, 5); // Returns 1~5
numRandom(10, 20); // Returns 10~20
```

## `sum` <Badge type="tip" text="JavaScript" />

Returns after adding up all the n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
sum(1, 2, 3); // Returns 6
sum([1, 2, 3, 4]); // Returns 10
```

## `mul` <Badge type="tip" text="JavaScript" />

Returns after multiplying all n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
mul(1, 2, 3); // Returns 6
mul([1, 2, 3, 4]); // Returns 24
```

## `sub` <Badge type="tip" text="JavaScript" />

Returns after subtracting all n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
sub(10, 1, 5); // Returns 4
sub([1, 2, 3, 4]); // Returns -8
```

## `div` <Badge type="tip" text="JavaScript" />

Returns after dividing all n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
div(10, 5, 2); // Returns 1
div([100, 2, 2, 5]); // Returns 5
```
