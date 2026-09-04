# objPickBy
콜백이 `true`를 반환한 항목만 담은 새 객체를 반환합니다.

콜백은 생태계의 다른 라이브러리와 동일하게 `(value, key)` 순서로 전달받습니다. 최상위 항목만 검사하므로 중첩된 객체는 필터링되지 않고 그대로 유지됩니다.

원본 객체는 변경되지 않습니다. 첫 번째 인자가 객체가 아니면 `null`을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: '필터링할 객체입니다. 원본은 변경되지 않습니다.' },
	{ name: 'predicate', type: { js: 'function', dart: 'bool Function(dynamic value, String key)' }, required: true, desc: '각 항목마다 `(value, key)` 형태로 호출됩니다. `true`를 반환하면 해당 항목이 유지됩니다.' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
objPickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1); // Returns { b: 2, c: 3 }
objPickBy({ a: 1, b: 2 }, (value, key) => key === 'a'); // Returns { a: 1 }
objPickBy({ a: null, b: 1 }, (value) => value !== null); // Returns { b: 1 }
objPickBy({ a: 1 }, () => false); // Returns {}
```

:::

::: lang dart

```dart
objPickBy({'a': 1, 'b': 2, 'c': 3}, (value, key) => value > 1); // Returns {'b': 2, 'c': 3}
objPickBy({'a': 1, 'b': 2}, (value, key) => key == 'a'); // Returns {'a': 1}
objPickBy({'a': null, 'b': 1}, (value, key) => value != null); // Returns {'b': 1}
objPickBy({'a': 1}, (value, key) => false); // Returns {}
```

:::

::: lang python

```python
objPickBy({'a': 1, 'b': 2, 'c': 3}, lambda value, key: value > 1)  # Returns {'b': 2, 'c': 3}
objPickBy({'a': 1, 'b': 2}, lambda value, key: key == 'a')  # Returns {'a': 1}
objPickBy({'a': None, 'b': 1}, lambda value, key: value is not None)  # Returns {'b': 1}
objPickBy({'a': 1}, lambda value, key: False)  # Returns {}
```

:::
