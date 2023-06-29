# Methods: Math

## `_.numRandom (number)`

Returns a random number (Between min and max).

- `min::number`
- `max::number`

```javascript
_.numRandom(1, 5); // Returns 1~5
_.numRandom(10, 20); // Returns 10~20
```

## `_.sum (number)`

Returns after adding up all the n arguments of numbers or the values of a single array of numbers.

- `numbers::...number[]`

```javascript
_.sum(1, 2, 3); // Returns 6
_.sum([1, 2, 3, 4]); // Returns 10
```

## `_.mul (number)`

Returns after multiplying all n arguments of numbers or the values of a single array of numbers.

- `numbers::...number[]`

```javascript
_.mul(1, 2, 3); // Returns 6
_.mul([1, 2, 3, 4]); // Returns 24
```

## `_.sub (number)`

Returns after subtracting all n arguments of numbers or the values of a single array of numbers.

- `numbers::...number[]`

```javascript
_.sub(10, 1, 5); // Returns 4
_.sub([1, 2, 3, 4]); // Returns -8
```

## `_.div (number)`

Returns after dividing all n arguments of numbers or the values of a single array of numbers.

- `numbers::...number[]`

```javascript
_.div(10, 5, 2); // Returns 1
_.div([100, 2, 2, 5]); // Returns 5
```
