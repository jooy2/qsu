# isObject <Lang dart js />

주어진 데이터가 `Object` 타입인지 확인합니다. `Array`를 포함한 다른 데이터 타입의 경우 `false`를 반환합니다.

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
