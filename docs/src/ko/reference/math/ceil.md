# ceil <Lang js dart python />

숫자를 지정한 소수점 자릿수로 **올림**합니다. `precision`이 음수이면 10의 자리, 100의 자리 단위로 올림합니다. `ceil(6040, -2)`는 `6100`을 반환합니다.

0에서 먼 쪽이 아니라 양의 무한대 방향으로 올림하므로, 음수는 값이 커집니다. `ceil(-4.006)`은 `-4`를 반환합니다.

값에 10의 거듭제곱을 곱하는 대신 최단 문자열 표현의 지수를 옮기는 방식으로 자릿수를 이동하기 때문에, 부동소수점 오차로 인한 문제가 발생하지 않습니다. `1.1 * 10`이 `11.000000000000002`임에도 `ceil(1.1, 1)`은 `1.2`가 아니라 `1.1`을 반환합니다.

`NaN`과 무한대 값은 그대로 반환됩니다.

[round](./round)의 "항상 올림" 짝이며, "항상 내림"은 [floor](./floor)입니다. 세 함수 모두 인자 형태가 동일합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: 'number', required: true, desc: '올림할 숫자입니다.' },
	{ name: 'precision', type: 'number', default: '0', desc: '올림할 소수점 자릿수입니다. 정수여야 하며, 음수를 지정하면 10의 자리, 100의 자리 단위로 올림합니다.' }
]" />

## Returns

> number

## Examples

::: lang js

```javascript
ceil(4.006); // Returns 5
ceil(-4.006); // Returns -4
ceil(6.004, 2); // Returns 6.01
ceil(6040, -2); // Returns 6100
ceil(1.1, 1); // Returns 1.1
```

:::

::: lang dart

```dart
ceil(4.006); // Returns 5
ceil(-4.006); // Returns -4
ceil(6.004, 2); // Returns 6.01
ceil(6040, -2); // Returns 6100
ceil(1.1, 1); // Returns 1.1
```

:::

::: lang python

```python
ceil(4.006)  # Returns 5
ceil(-4.006)  # Returns -4
ceil(6.004, 2)  # Returns 6.01
ceil(6040, -2)  # Returns 6100
ceil(1.1, 1)  # Returns 1.1
```

:::
