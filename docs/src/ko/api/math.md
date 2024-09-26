---
title: Math
order: 4
---

# API: Math

## `numRandom` <Badge type="tip" text="JavaScript" />

Returns a random number (Between min and max).

### Parameters

- `min::number`
- `max::number`

### Returns

> number

### Examples

```javascript
_.numRandom(1, 5); // Returns 1~5
_.numRandom(10, 20); // Returns 10~20
```

## `sum` <Badge type="tip" text="JavaScript" />

Returns after adding up all the n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
_.sum(1, 2, 3); // Returns 6
_.sum([1, 2, 3, 4]); // Returns 10
```

## `mul` <Badge type="tip" text="JavaScript" />

Returns after multiplying all n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
_.mul(1, 2, 3); // Returns 6
_.mul([1, 2, 3, 4]); // Returns 24
```

## `sub` <Badge type="tip" text="JavaScript" />

Returns after subtracting all n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
_.sub(10, 1, 5); // Returns 4
_.sub([1, 2, 3, 4]); // Returns -8
```

## `div` <Badge type="tip" text="JavaScript" />

Returns after dividing all n arguments of numbers or the values of a single array of numbers.

### Parameters

- `numbers::...number[]`

### Returns

> number

### Examples

```javascript
_.div(10, 5, 2); // Returns 1
_.div([100, 2, 2, 5]); // Returns 5
```
