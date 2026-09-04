# objClone <Lang js dart python />

객체를 복사합니다. 기본값은 깊은 복사이므로 결과 안의 어떤 값도 원본과 공유되지 않습니다. 최상위 단계만 복사하려면 `deep: false`를 전달하세요.

자기 자신을 다시 가리키는 구조도 처리합니다. 복사 중인 컨테이너를 모두 기억해 두기 때문에, 순환 참조는 스택이 넘칠 때까지 재귀하지 않고 같은 모양으로 다시 만들어집니다.

컨테이너가 아닌 값은 그대로 반환하므로 `objClone(5)`는 `5`입니다.

## 복사 대상

컨테이너는 새로 만들고, 어떻게 만들어졌는지 모르면 다시 만들 수 없는 값은 그대로 반환합니다.

| | JavaScript | Dart | Python |
| --- | --- | --- | --- |
| 새로 만들고 내용까지 복사 | 일반 객체, `Array`, `Map`, `Set` | `Map`, `List`, `Set` | `dict`, `list`, `tuple` |
| 새 복사본 생성 | `Date`, `RegExp` | — | `set` (원소가 불변) |
| 그대로 반환 | 함수, 클래스 인스턴스 | `DateTime`(불변), 클래스 인스턴스 | `datetime`(불변), 클래스 인스턴스 |

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'any', required: true, desc: '복사할 값입니다. 컨테이너가 아니면 그대로 반환합니다.' },
	{ name: 'options', type: 'CloneOptions', named: true, desc: '복사 옵션입니다. 아래 표를 참고하세요.' }
]" />

<ParamsTable name="CloneOptions" :rows="[
	{ name: 'deep', type: 'boolean', default: 'true', desc: '값 내부까지 모두 복사합니다. `false`이면 최상위 단계만 복사하며, 중첩된 컨테이너는 원본과 공유됩니다.' }
]" />

## Returns

<ReturnType type="any" />

## Examples

::: lang js

```javascript
const source = { a: 1, b: { c: [1, 2] } };

const deep = objClone(source);
deep.b.c[0] = 99; // `source.b.c[0]`는 여전히 1

const shallow = objClone(source, { deep: false });
shallow.b === source.b; // true, 중첩된 객체는 공유됨

objClone([1, [2, 3]]); // Returns [1, [2, 3]]
objClone(5); // Returns 5
```

:::

::: lang dart

```dart
final source = {'a': 1, 'b': {'c': [1, 2]}};

final deep = objClone(source);
deep['b']['c'][0] = 99; // `source['b']['c'][0]`는 여전히 1

final shallow = objClone(source, deep: false);
identical(shallow['b'], source['b']); // true, 중첩된 맵은 공유됨

objClone([1, [2, 3]]); // Returns [1, [2, 3]]
objClone(5); // Returns 5
```

:::

::: lang python

```python
source = {'a': 1, 'b': {'c': [1, 2]}}

deep = objClone(source)
deep['b']['c'][0] = 99  # `source['b']['c'][0]`는 여전히 1

shallow = objClone(source, {'deep': False})
shallow['b'] is source['b']  # True, 중첩된 dict는 공유됨

objClone([1, [2, 3]])  # Returns [1, [2, 3]]
objClone(5)  # Returns 5
```

:::
