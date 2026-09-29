# isLeapYear

그레고리력에서 윤년이면 `true`를 반환합니다. 4로 나누어떨어지는 해가 윤년이고, 그중 100으로 나누어떨어지지만 400으로는 나누어떨어지지 않는 해는 제외합니다. 2024년과 2000년은 윤년이고, 2023년과 1900년은 윤년이 아닙니다.

이 규칙은 0년과 그 이전의 해에도 똑같이 적용하며, 역산 그레고리력의 방식을 따릅니다.

한 달의 날수는 [getDaysInMonth](./getDaysInMonth)로 구하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'year', type: 'number', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isLeapYear(2024); // Returns true
isLeapYear(2023); // Returns false
isLeapYear(1900); // Returns false
isLeapYear(2000); // Returns true
```

:::

::: lang dart

```dart
isLeapYear(2024); // Returns true
isLeapYear(2023); // Returns false
isLeapYear(1900); // Returns false
isLeapYear(2000); // Returns true
```

:::

::: lang python

```python
isLeapYear(2024)  # Returns True
isLeapYear(2023)  # Returns False
isLeapYear(1900)  # Returns False
isLeapYear(2000)  # Returns True
```

:::
