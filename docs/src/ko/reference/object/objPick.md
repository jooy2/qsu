# objPick <Lang js dart python />

지정한 키만 남긴 새 객체를 반환합니다. 키는 하나만 전달하거나 배열로 전달할 수 있습니다.

최상위 단계만 확인하며, 객체에 없는 키는 빈 값으로 채우지 않고 건너뜁니다. 따라서 원본에 없던 키가 결과에 생기지 않습니다. 값은 그대로 옮겨지므로 중첩된 객체는 복사되지 않고 원본과 공유됩니다. 복사가 필요하면 [objClone](./objClone)을 사용하세요.

원본 객체는 변경되지 않습니다. 첫 번째 인수가 객체가 아니면 `null`을 반환합니다.

콜백으로 걸러내려면 [objPickBy](./objPickBy)를 사용하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: '읽어올 객체입니다. 변경되지 않습니다.' },
	{ name: 'keys', type: 'string | string[]', required: true, desc: '남길 키 이름 하나 또는 키 이름의 배열입니다.' }
]" />

## Returns

> object | null

## Examples

::: code-group

```javascript [JavaScript]
objPick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // Returns { a: 1, c: 3 }
objPick({ a: 1, b: 2 }, 'a'); // Returns { a: 1 }
objPick({ a: 1 }, ['a', 'zzz']); // Returns { a: 1 }
objPick({ a: 1, b: 2 }, []); // Returns {}
```

```dart [Dart]
objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c']); // Returns {'a': 1, 'c': 3}
objPick({'a': 1, 'b': 2}, 'a'); // Returns {'a': 1}
objPick({'a': 1}, ['a', 'zzz']); // Returns {'a': 1}
objPick({'a': 1, 'b': 2}, []); // Returns {}
```

```python [Python]
objPick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c'])  # Returns {'a': 1, 'c': 3}
objPick({'a': 1, 'b': 2}, 'a')  # Returns {'a': 1}
objPick({'a': 1}, ['a', 'zzz'])  # Returns {'a': 1}
objPick({'a': 1, 'b': 2}, [])  # Returns {}
```

:::
