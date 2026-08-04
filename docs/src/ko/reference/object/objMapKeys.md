# objMapKeys <Lang dart js python />

콜백이 반환한 값을 키로 사용하는 새 객체를 반환합니다. 값은 그대로 유지됩니다.

콜백은 생태계의 다른 라이브러리와 동일하게 `(value, key)` 순서로 전달받으며, 문자열을 반환해야 합니다. 최상위 항목만 처리하므로 중첩된 객체의 키는 변경되지 않습니다.

두 키가 같은 이름으로 변환되면 나중 항목이 남습니다. 원본 객체는 변경되지 않으며, 첫 번째 인자가 객체가 아니면 `null`을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: '키를 변환할 객체입니다. 원본은 변경되지 않습니다.' },
	{ name: 'iteratee', type: 'function', required: true, desc: '각 항목마다 `(value, key)` 형태로 호출됩니다. 반환값이 새 키가 됩니다.' }
]" />

## Returns

> object | null

## Examples

::: code-group

```javascript [JavaScript]
objMapKeys({ a: 1, b: 2 }, (value, key) => key.toUpperCase()); // Returns { A: 1, B: 2 }
objMapKeys({ a: 1, b: 2 }, (value, key) => `${key}${value}`); // Returns { a1: 1, b2: 2 }
objMapKeys({ a: 1, b: 2 }, () => 'x'); // Returns { x: 2 }
```

```dart [Dart]
objMapKeys({'a': 1, 'b': 2}, (value, key) => key.toUpperCase()); // Returns {'A': 1, 'B': 2}
objMapKeys({'a': 1, 'b': 2}, (value, key) => '$key$value'); // Returns {'a1': 1, 'b2': 2}
objMapKeys({'a': 1, 'b': 2}, (value, key) => 'x'); // Returns {'x': 2}
```

```python [Python]
objMapKeys({'a': 1, 'b': 2}, lambda value, key: key.upper())  # Returns {'A': 1, 'B': 2}
objMapKeys({'a': 1, 'b': 2}, lambda value, key: f'{key}{value}')  # Returns {'a1': 1, 'b2': 2}
objMapKeys({'a': 1, 'b': 2}, lambda value, key: 'x')  # Returns {'x': 2}
```

:::
