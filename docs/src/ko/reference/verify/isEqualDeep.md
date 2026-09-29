# isEqualDeep

두 값을 내용으로 비교해 끝까지 같으면 `true`를 반환합니다. 배열은 길이가 같고 같은 순서에 같은 항목이 있으면 같습니다. 객체는 키가 같고 각 키의 값이 같으면 같으며, 키의 순서는 따지지 않습니다.

값의 타입을 바꾸지 않으므로 `1`과 `'1'`은 다르고, `true`와 `1`도 다릅니다. 숫자는 값으로 비교하므로 `1`과 `1.0`, `0`과 `-0`은 같고, `NaN`도 `NaN`과 같습니다. 날짜는 같은 시각을 가리키면 같습니다.

클래스 인스턴스 같은 그 밖의 값은 <Val js="===" dart="==" python="==" />로 비교합니다. 자기 자신을 담고 있는 구조도 끝없이 돌지 않고 비교합니다.

[isEqual](./isEqual)과 달리 값을 정확히 두 개 받고, 두 번째로 넘긴 배열은 값의 목록이 아니라 비교할 값입니다.

::: lang js

`null`과 `undefined`는 서로 다른 값입니다. 일반 객체는 `{}`나 `Object.create(null)`로 만든 객체입니다. `Map`, `Set`, 클래스 인스턴스는 그 밖의 값이므로 같은 인스턴스일 때만 같습니다.

:::

::: lang dart

모든 `List`는 배열로, 모든 `Map`은 객체로 비교합니다. `Set`은 그 밖의 값이라 `==`로 비교하는데, 집합에서 `==`는 같은 인스턴스인지를 봅니다.

:::

::: lang python

항목이 같은 `list`와 `tuple`은 같고, `dict`의 하위 클래스도 `dict`로 비교합니다. `set`은 그 밖의 값이라 `==`로 비교합니다.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'left', type: 'any', required: true },
	{ name: 'right', type: 'any', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isEqualDeep({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // Returns true
isEqualDeep({ a: 1, b: 2 }, { b: 2, a: 1 }); // Returns true
isEqualDeep([1, 2], [2, 1]); // Returns false
isEqualDeep({ a: 1 }, { a: '1' }); // Returns false
isEqualDeep(NaN, NaN); // Returns true
```

:::

::: lang dart

```dart
isEqualDeep({'a': [1, {'b': 2}]}, {'a': [1, {'b': 2}]}); // Returns true
isEqualDeep({'a': 1, 'b': 2}, {'b': 2, 'a': 1}); // Returns true
isEqualDeep([1, 2], [2, 1]); // Returns false
isEqualDeep({'a': 1}, {'a': '1'}); // Returns false
isEqualDeep(double.nan, double.nan); // Returns true
```

:::

::: lang python

```python
isEqualDeep({'a': [1, {'b': 2}]}, {'a': [1, {'b': 2}]})  # Returns True
isEqualDeep({'a': 1, 'b': 2}, {'b': 2, 'a': 1})  # Returns True
isEqualDeep([1, 2], (1, 2))  # Returns True
isEqualDeep(True, 1)  # Returns False
isEqualDeep(float('nan'), float('nan'))  # Returns True
```

:::
