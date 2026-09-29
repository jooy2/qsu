# objOmit

지정한 키를 뺀 새 객체를 반환합니다. 키는 하나만 전달하거나 배열로 전달할 수 있습니다. [objPick](./objPick)의 반대입니다.

최상위 단계만 확인하며, 객체에 없는 키는 무시합니다. 값은 그대로 옮겨지므로 중첩된 객체는 복사되지 않고 원본과 공유됩니다. 복사가 필요하면 [objClone](./objClone)을 사용하세요.

원본 객체는 변경되지 않습니다. 첫 번째 인수가 객체가 아니면 `null`을 반환합니다.

조건으로 키를 빼려면 조건을 뒤집어 [objPickBy](./objPickBy)를 사용하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: '읽어올 객체입니다. 변경되지 않습니다.' },
	{ name: 'keys', type: 'string | string[]', required: true, desc: '뺄 키 이름 하나 또는 키 이름의 배열입니다.' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
objOmit({ a: 1, b: 2, c: 3 }, ['a', 'c']); // Returns { b: 2 }
objOmit({ a: 1, b: 2 }, 'a'); // Returns { b: 2 }
objOmit({ a: 1 }, ['zzz']); // Returns { a: 1 }
```

:::

::: lang dart

```dart
objOmit({'a': 1, 'b': 2, 'c': 3}, ['a', 'c']); // Returns {'b': 2}
objOmit({'a': 1, 'b': 2}, 'a'); // Returns {'b': 2}
objOmit({'a': 1}, ['zzz']); // Returns {'a': 1}
```

:::

::: lang python

```python
objOmit({'a': 1, 'b': 2, 'c': 3}, ['a', 'c'])  # Returns {'b': 2}
objOmit({'a': 1, 'b': 2}, 'a')  # Returns {'b': 2}
objOmit({'a': 1}, ['zzz'])  # Returns {'a': 1}
```

:::
