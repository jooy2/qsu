# floor
숫자를 지정한 소수점 자릿수로 **내림**합니다. `precision`이 음수이면 10의 자리, 100의 자리 단위로 내림합니다. `floor(4060, -2)`는 `4000`을 반환합니다.

0 방향이 아니라 음의 무한대 방향으로 내림하므로, 음수는 값이 작아집니다. `floor(-4.006)`은 `-5`를 반환합니다.

값에 10의 거듭제곱을 곱하는 대신 최단 문자열 표현의 지수를 옮기는 방식으로 자릿수를 이동하기 때문에, 부동소수점 오차로 인한 문제가 발생하지 않습니다. `floor(1.1, 1)`은 `1.0`이 아니라 `1.1`을 반환합니다.

`NaN`과 무한대 값은 그대로 반환됩니다.

[round](./round)의 "항상 내림" 짝이며, "항상 올림"은 [ceil](./ceil)입니다. 세 함수 모두 인자 형태가 동일합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num' }, required: true, desc: '내림할 숫자입니다.' },
	{ name: 'precision', type: 'number', default: '0', desc: '내림할 소수점 자릿수입니다. 정수여야 하며, 음수를 지정하면 10의 자리, 100의 자리 단위로 내림합니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
floor(4.006); // Returns 4
floor(-4.006); // Returns -5
floor(0.046, 2); // Returns 0.04
floor(4060, -2); // Returns 4000
floor(1.1, 1); // Returns 1.1
```

:::

::: lang dart

```dart
floor(4.006); // Returns 4
floor(-4.006); // Returns -5
floor(0.046, 2); // Returns 0.04
floor(4060, -2); // Returns 4000
floor(1.1, 1); // Returns 1.1
```

:::

::: lang python

```python
floor(4.006)  # Returns 4
floor(-4.006)  # Returns -5
floor(0.046, 2)  # Returns 0.04
floor(4060, -2)  # Returns 4000
floor(1.1, 1)  # Returns 1.1
```

:::
