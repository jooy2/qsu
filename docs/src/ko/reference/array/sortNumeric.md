# sortNumeric
문자열로 구성된 배열을 정렬할 때, 이름이 아니라 문자열에 포함된 숫자 순서로 정렬됩니다. 예를 들어, 배열 `['1-a', '100-a', '10-a', '2-a']`가 주어지면, 더 작은 숫자가 앞에 오도록 `['1-a', '2-a', '10-a', '100-a']`가 반환됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'string[]', required: true },
	{ name: 'descending', type: 'boolean', default: 'false', named: true }
]" />

## 정렬 순서

문자열을 숫자 구간과 그 밖의 구간으로 나눈 뒤, 문자열 전체를 세 번 훑으며 비교합니다. 먼저 글자, 다음으로 글자에 붙은 악센트, 마지막으로 대소문자입니다. 대소문자는 글자와 숫자가 같을 때에야 따지므로 `item1`이 `Item10`보다 앞에 옵니다. 문자를 하나씩 비교하면 `Item10`이 앞에 옵니다.

한 번의 비교 안에서는 공백이 문장 부호와 기호보다, 그다음이 숫자, 마지막이 글자 순입니다. 그래서 `.gitignore`가 `1file`보다 앞에 옵니다. 숫자 구간은 자릿수를 먼저 비교하므로, 각 언어의 수 타입이 담을 수 있는 범위를 넘는 숫자도 올바르게 정렬됩니다.

결과는 세 패키지가 모두 같고, 실행하는 기계의 로케일에 영향을 받지 않습니다.

## Returns

<ReturnType type="string[]" />

## Examples

::: lang js

```javascript
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

:::

::: lang dart

```dart
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

:::

::: lang python

```python
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a'])
# Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

:::
