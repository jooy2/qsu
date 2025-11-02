# objToArray <Lang dart js />

주어진 객체를 배열 형식으로 변환합니다. 결과 배열은 다음과 같이 하나의 키 값이 저장된 2차원 배열입니다: `[key, value]`. `recursive` 옵션이 `true`인 경우, 값의 유형이 `object`인 경우 다시 2차원 배열로 변환됩니다.

## Parameters

- `obj::object`
- `recursive::boolean` <DartNamed />

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
objToArray({
	a: 1.234,
	b: 'str',
	c: [1, 2, 3],
	d: { a: 1 }
}); // Returns [['a', 1.234], ['b', 'str'], ['c', [1, 2, 3]], ['d', { a: 1 }]]
```

```dart [Dart]
objToArray({
  'a': 1.234,
  'b': 'str',
  'c': [1, 2, 3],
  'd': { 'a': 1 }
}); // Returns [['a', 1.234], ['b', 'str'], ['c', [1, 2, 3]], ['d', { 'a': 1 }]]
```

:::
