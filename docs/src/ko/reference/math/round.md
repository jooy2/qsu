# round
숫자를 지정한 소수점 자릿수로 반올림합니다. `precision`이 음수이면 10의 자리, 100의 자리 단위로 반올림합니다. `round(1234, -2)`는 `1200`을 반환합니다.

**정확히 중간값(0.5)은 0에서 먼 쪽으로 반올림합니다.** 따라서 `0.5`는 `1`, `-0.5`는 `-1`이 됩니다. 이 함수는 정밀도 보조 기능이기 이전에 언어 간 동작을 맞추기 위한 것입니다. 각 언어의 기본 동작은 서로 다릅니다. `0.5`는 JavaScript에서 `1`, Dart에서 `1`, Python에서 `0`이 되고, `-1.5`는 각각 `-1`, `-2`, `-2`가 됩니다. Lodash도 이 지점이 다릅니다. Lodash는 중간값을 양의 무한대 방향으로 보내므로 `_.round(-0.5)`는 `-0`입니다.

값에 10의 거듭제곱을 곱하는 대신 최단 문자열 표현의 지수를 옮기는 방식으로 자릿수를 이동하기 때문에, 부동소수점 오차로 인한 문제가 발생하지 않습니다. `round(1.005, 2)`는 `1`이 아니라 `1.01`을 반환하고, `round(2.675, 2)`는 `2.68`을 반환합니다.

`NaN`과 무한대 값은 그대로 반환됩니다.

가장 가까운 값이 아니라 항상 올리거나 내리려면 인자 형태가 동일한 [ceil](./ceil)과 [floor](./floor)를 사용하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num' }, required: true, desc: '반올림할 숫자입니다.' },
	{ name: 'precision', type: 'number', default: '0', desc: '반올림할 소수점 자릿수입니다. 정수여야 하며, 음수를 지정하면 10의 자리, 100의 자리 단위로 반올림합니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
round(0.5); // Returns 1
round(2.5); // Returns 3
round(-0.5); // Returns -1
round(-1.5); // Returns -2
round(1.005, 2); // Returns 1.01
round(2.675, 2); // Returns 2.68
round(1234, -2); // Returns 1200
```

:::

::: lang dart

```dart
round(0.5); // Returns 1
round(2.5); // Returns 3
round(-0.5); // Returns -1
round(-1.5); // Returns -2
round(1.005, 2); // Returns 1.01
round(2.675, 2); // Returns 2.68
round(1234, -2); // Returns 1200
```

:::

::: lang python

```python
round(0.5)  # Returns 1
round(2.5)  # Returns 3
round(-0.5)  # Returns -1
round(-1.5)  # Returns -2
round(1.005, 2)  # Returns 1.01
round(2.675, 2)  # Returns 2.68
round(1234, -2)  # Returns 1200
```

:::
