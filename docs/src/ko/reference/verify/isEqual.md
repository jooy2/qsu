# isEqual <Lang dart js python />

첫 번째 인수의 값을 왼쪽 피연산자로, 그 다음에 주어진 인수의 값을 오른쪽 피연산자로 비교하고, 값이 모두 같으면 `true`를 반환합니다.

`isEqual`은 데이터 유형이 일치하지 않더라도 `true`를 반환하지만, `isEqualStrict`는 모든 인수의 데이터 유형이 일치할 때만 `true`를 반환합니다.

두 번째 인수로 배열을 전달하면 "오른쪽 피연산자들을 배열로 넘긴 것"으로 처리합니다. 배열이 아닌 객체는 값으로 간주하며, 비교 방식은 각 언어의 동등성 규칙을 따릅니다. JavaScript와 Dart는 객체를 참조로 비교하므로 내용이 같아도 서로 다른 객체는 **같지 않고**, Python은 `dict`의 내용을 비교하므로 **같습니다**.

## Parameters

<ParamsTable :rows="[
	{ name: 'leftOperand', type: 'any', required: true },
	{ name: 'rightOperand', type: 'any | any[] | ...any', required: true }
]" />

::: lang dart

`rightOperand`는 가변 인자가 아닙니다. 값을 하나나 둘까지 전달하거나, 리스트 하나로 전달하세요.

:::

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
const val1 = 'Left';
const val2 = 1;

isEqual('Left', 'Left', val1); // Returns true
isEqual(1, [1, '1', 1, val2]); // Returns true
isEqual(val1, ['Right', 'Left', 1]); // Returns false
isEqual(1, 1, 1, 1); // Returns true
```

:::

::: lang dart

```dart
final String val1 = 'Left';
final int val2 = 1;

isEqual('Left', 'Left'); // Returns true
isEqual(1, [1, '1', 1, val2]); // Returns true
isEqual(val1, ['Right', 'Left', 1]); // Returns false
isEqual(1, 1); // Returns true
```

:::

::: lang python

```python
val1 = 'Left'
val2 = 1

isEqual('Left', 'Left', val1)  # Returns True
isEqual(1, [1, '1', 1, val2])  # Returns True
isEqual(val1, ['Right', 'Left', 1])  # Returns False
isEqual(1, 1, 1, 1)  # Returns True
```

:::
