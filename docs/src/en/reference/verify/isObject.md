# isObject <Lang dart js />

Check whether the given data is of type `Object`. Returns `false` for other data types including `Array`.

## Parameters

- `data::any`

## Returns

> boolean

## Examples

```javascript [JavaScript]
isObject([1, 2, 3]); // Returns false
isObject({ a: 1, b: 2 }); // Returns true
```

```dart [Dart]
isObject([1, 2, 3]); // Returns false
isObject({ 'a': 1, 'b': 2 }); // Returns true
```

:::
