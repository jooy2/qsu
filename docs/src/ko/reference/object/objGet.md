# objGet
경로를 사용해 객체 안쪽의 값을 읽습니다. 경로가 존재하지 않으면 `fallback` 값을 반환합니다.

경로는 점 표기법과 대괄호 표기법을 모두 지원하며, 둘을 섞어 쓸 수 있습니다. `a.b.c`, `list[0]`, `list[1].d`, `list.1.d`가 모두 동작합니다. 대괄호 안에 따옴표로 감싼 키를 넣으면 그 안의 점은 경로 구분자로 해석되지 않습니다. `["a.b"]`는 두 단계를 내려가는 대신 `a.b`라는 이름의 키 하나를 읽습니다.

각 단계의 존재 여부는 값이 아니라 키의 존재로 판단합니다. 따라서 값이 `null`로 저장되어 있으면 `fallback`이 아니라 `null`을 그대로 반환합니다.

배열은 숫자 인덱스로 접근합니다. 중간 단계가 없거나, 더 이상 내려갈 수 없는 값을 만나거나, 첫 번째 인수가 객체가 아니면 `fallback`을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: '값을 읽어올 객체입니다.' },
	{ name: 'path', type: 'string', required: true, desc: '값의 경로입니다. 점 표기법과 대괄호 표기법을 사용할 수 있습니다.' },
	{ name: 'options', type: 'ObjGetOptions', named: true, desc: '조회 옵션입니다. 아래 표를 참고하세요.' }
]" />

<ParamsTable name="ObjGetOptions" :rows="[
	{ name: 'fallback', type: 'any', default: 'null', desc: '경로가 존재하지 않을 때 반환할 값입니다.' }
]" />

## Returns

<ReturnType type="any" />

## Examples

::: lang js

```javascript
const data = { a: { b: { c: 42 } }, list: [1, { d: 'x' }] };

objGet(data, 'a.b.c'); // Returns 42
objGet(data, 'list[0]'); // Returns 1
objGet(data, 'list[1].d'); // Returns 'x'
objGet(data, 'a.zzz'); // Returns null
objGet(data, 'a.zzz', { fallback: 'none' }); // Returns 'none'
objGet({ 'a.b': 1 }, '["a.b"]'); // Returns 1
```

:::

::: lang dart

```dart
final data = {'a': {'b': {'c': 42}}, 'list': [1, {'d': 'x'}]};

objGet(data, 'a.b.c'); // Returns 42
objGet(data, 'list[0]'); // Returns 1
objGet(data, 'list[1].d'); // Returns 'x'
objGet(data, 'a.zzz'); // Returns null
objGet(data, 'a.zzz', fallback: 'none'); // Returns 'none'
objGet({'a.b': 1}, '["a.b"]'); // Returns 1
```

:::

::: lang python

```python
data = {'a': {'b': {'c': 42}}, 'list': [1, {'d': 'x'}]}

objGet(data, 'a.b.c')  # Returns 42
objGet(data, 'list[0]')  # Returns 1
objGet(data, 'list[1].d')  # Returns 'x'
objGet(data, 'a.zzz')  # Returns None
objGet(data, 'a.zzz', {'fallback': 'none'})  # Returns 'none'
objGet({'a.b': 1}, '["a.b"]')  # Returns 1
```

:::
