# objMerge <Lang js dart python />

여러 개의 객체를 중첩된 단계까지 재귀적으로 병합해 새 객체 하나로 반환합니다. 같은 키가 여러 소스에 있으면 나중에 온 값이 이깁니다.

같은 키 아래에 객체가 둘 다 있으면 **새 객체**로 병합하므로, 결과가 어느 쪽 소스와도 객체를 공유하지 않고 원본도 변경되지 않습니다. 그 외의 값은 배열을 포함해 나중 값으로 통째로 교체됩니다. Lodash는 배열을 인덱스 단위로 병합해 지우려던 요소가 남는 문제가 있어, `objMerge({ a: [1, 2, 3] }, { a: [9] })`는 여기서 `{ a: [9] }`를, Lodash에서는 `{ a: [9, 2, 3] }`를 반환합니다.

한쪽 소스에만 있는 키는 값을 그대로 옮기므로, 그 키 아래의 중첩 객체는 해당 소스와 공유됩니다. JavaScript의 전개 연산자와 같은 동작입니다. 완전히 독립적인 복사본이 필요하면 [objClone](./objClone)을 사용하세요.

인수가 하나도 없거나, 객체가 아닌 인수가 하나라도 있으면 `null`을 반환합니다.

[objMergeNewKey](./objMergeNewKey)는 범위가 더 좁은 함수로, 없는 키만 추가하고 기존 값은 절대 덮어쓰지 않습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'objects', type: { js: '...object[]', dart: 'List<Map<String, dynamic>?>' }, required: true, desc: '병합할 객체들입니다. 나중에 오는 객체가 우선합니다. Dart에서는 하나의 배열로 전달합니다.' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
objMerge({ a: 1 }, { b: 2 }); // Returns { a: 1, b: 2 }
objMerge({ a: 1 }, { a: 2 }, { a: 3 }); // Returns { a: 3 }
objMerge({ a: { b: 1, c: 2 } }, { a: { c: 9, d: 3 } }); // Returns { a: { b: 1, c: 9, d: 3 } }
objMerge({ a: [1, 2, 3] }, { a: [9] }); // Returns { a: [9] }
objMerge({ a: 1 }, null); // Returns null
```

:::

::: lang dart

```dart
objMerge([{'a': 1}, {'b': 2}]); // Returns {'a': 1, 'b': 2}
objMerge([{'a': 1}, {'a': 2}, {'a': 3}]); // Returns {'a': 3}
objMerge([{'a': {'b': 1, 'c': 2}}, {'a': {'c': 9, 'd': 3}}]); // Returns {'a': {'b': 1, 'c': 9, 'd': 3}}
objMerge([{'a': [1, 2, 3]}, {'a': [9]}]); // Returns {'a': [9]}
objMerge([{'a': 1}, null]); // Returns null
```

:::

::: lang python

```python
objMerge({'a': 1}, {'b': 2})  # Returns {'a': 1, 'b': 2}
objMerge({'a': 1}, {'a': 2}, {'a': 3})  # Returns {'a': 3}
objMerge({'a': {'b': 1, 'c': 2}}, {'a': {'c': 9, 'd': 3}})  # Returns {'a': {'b': 1, 'c': 9, 'd': 3}}
objMerge({'a': [1, 2, 3]}, {'a': [9]})  # Returns {'a': [9]}
objMerge({'a': 1}, None)  # Returns None
```

:::
