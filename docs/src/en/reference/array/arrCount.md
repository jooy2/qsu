# arrCount <Lang dart js />

Returns the number of duplicates for each unique value in the given array. The array values can only be of type `String` or `Number`.

## Parameters

- `array::string[]|number[]`
- `count::number`

## Returns

> object

## Examples

::: code-group

```javascript [JavaScript]
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

```dart [Dart]
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

:::
