# objSet

경로에 값을 쓴 객체의 복사본을 반환합니다. 가는 길에 없는 단계는 새로 만듭니다. [objGet](./objGet)과 짝을 이루는 쓰기 함수이고, 경로도 같은 방식으로 읽습니다. `a.b.c`, `list[0]`, `list[1].d`, `["a.b"]`가 모두 동작합니다.

원본 객체는 변경되지 않습니다. 경로 위에 있는 객체와 배열은 모두 복사하고, 경로 밖의 값은 원본과 공유합니다.

없는 단계나 객체도 배열도 아닌 값이 있는 단계는 새 빈 객체로 바꿉니다. `[0]` 같은 숫자 단계도 마찬가지여서, 새로 만드는 단계는 배열이 아니라 항상 객체입니다.

배열에서는 이미 있는 인덱스나 배열의 길이만 쓸 수 있고, 길이를 쓰면 끝에 덧붙입니다. 그 밖의 단계는 <Val js="RangeError" dart="RangeError" python="IndexError" />를 던집니다.

첫 번째 인수가 객체가 아니면 `null`을 반환합니다.

[objUpdate](./objUpdate)는 하는 일이 다릅니다. 이름으로 찾은 키의 값을 바꾸고, 옵션을 켜면 모든 깊이에서 찾습니다. 값이 들어갈 위치를 알고 있으면 `objSet`을 사용하세요.

::: lang js

객체 자신의 속성만 따라가므로 경로 위의 `constructor`나 `toString`은 없는 단계로 봅니다. `__proto__`라는 키는 보통 키로 쓰며, 프로토타입을 바꾸지 않습니다.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: '복사할 객체입니다. 변경되지 않습니다.' },
	{ name: 'path', type: 'string', required: true, desc: '값을 쓸 경로입니다. 점 표기법과 대괄호 표기법을 사용할 수 있습니다.' },
	{ name: 'value', type: 'any', required: true, desc: '쓸 값입니다.' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
const data = { a: { b: 1 }, list: [{ x: 1 }, { x: 2 }] };

objSet(data, 'a.b', 2); // Returns { a: { b: 2 }, list: [{ x: 1 }, { x: 2 }] }
objSet(data, 'list[1].x', 9); // Returns { a: { b: 1 }, list: [{ x: 1 }, { x: 9 }] }
objSet(data, 'list[2]', { x: 3 }); // Returns { a: { b: 1 }, list: [{ x: 1 }, { x: 2 }, { x: 3 }] }
objSet({}, 'a.b.c', 1); // Returns { a: { b: { c: 1 } } }
objSet({}, 'a[0]', 1); // Returns { a: { '0': 1 } }
```

:::

::: lang dart

```dart
final data = {
  'a': {'b': 1},
  'list': [{'x': 1}, {'x': 2}],
};

objSet(data, 'a.b', 2); // Returns {'a': {'b': 2}, 'list': [{'x': 1}, {'x': 2}]}
objSet(data, 'list[1].x', 9); // Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 9}]}
objSet(data, 'list[2]', {'x': 3}); // Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 2}, {'x': 3}]}
objSet({}, 'a.b.c', 1); // Returns {'a': {'b': {'c': 1}}}
objSet({}, 'a[0]', 1); // Returns {'a': {'0': 1}}
```

:::

::: lang python

```python
data = {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 2}]}

objSet(data, 'a.b', 2)  # Returns {'a': {'b': 2}, 'list': [{'x': 1}, {'x': 2}]}
objSet(data, 'list[1].x', 9)  # Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 9}]}
objSet(data, 'list[2]', {'x': 3})  # Returns {'a': {'b': 1}, 'list': [{'x': 1}, {'x': 2}, {'x': 3}]}
objSet({}, 'a.b.c', 1)  # Returns {'a': {'b': {'c': 1}}}
objSet({}, 'a[0]', 1)  # Returns {'a': {'0': 1}}
```

:::
