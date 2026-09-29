# arrWithNumber

`start`부터 `end`까지 `step`만큼 커지는 숫자 배열을 반환합니다. 양 끝은 간격이 맞아떨어질 때 포함됩니다. `0`부터 `10`까지 `5`씩 세면 `[0, 5, 10]`이고, `3`씩 세면 `9`에서 멈춥니다.

`step`은 `1` 이상의 정수라서 숫자는 항상 커집니다. 거꾸로 세려면 결과를 뒤집으세요.

`start`가 `end`보다 크거나 `step`이 `1` 이상의 정수가 아니면 <Val js="RangeError" dart="ArgumentError" python="ValueError" />를 던집니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'start', type: 'number', required: true, desc: '첫 번째 숫자입니다.' },
	{ name: 'end', type: 'number', required: true, desc: '결과에 들어갈 수 있는 마지막 숫자입니다. `start`보다 작으면 안 됩니다.' },
	{ name: 'options', type: 'ArrWithNumberOptions', named: true, desc: '아래 표를 참고하세요.' }
]" />

<ParamsTable name="ArrWithNumberOptions" :rows="[
	{ name: 'step', type: 'number', default: '1', desc: '이웃한 두 숫자의 간격입니다. `1` 이상의 정수여야 합니다.' }
]" />

## Returns

<ReturnType type="number[]" />

## Examples

::: lang js

```javascript
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
arrWithNumber(0, 10, { step: 5 }); // Returns [0, 5, 10]
arrWithNumber(0, 10, { step: 3 }); // Returns [0, 3, 6, 9]
```

:::

::: lang dart

```dart
arrWithNumber(1, 3); // Returns [1, 2, 3]
arrWithNumber(0, 3); // Returns [0, 1, 2, 3]
arrWithNumber(0, 10, step: 5); // Returns [0, 5, 10]
arrWithNumber(0, 10, step: 3); // Returns [0, 3, 6, 9]
```

:::

::: lang python

```python
arrWithNumber(1, 3)  # Returns [1, 2, 3]
arrWithNumber(0, 3)  # Returns [0, 1, 2, 3]
arrWithNumber(0, 10, step=5)  # Returns [0, 5, 10]
arrWithNumber(0, 10, step=3)  # Returns [0, 3, 6, 9]
```

:::
