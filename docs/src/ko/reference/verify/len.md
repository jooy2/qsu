# len <Lang dart js python />

모든 유형의 데이터 길이를 반환합니다. 인자 값이 `null`이면 `0`을 반환합니다.

::: lang js

`undefined`도 마찬가지로 `0`을 반환합니다.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any', required: true }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
len('12345'); // Returns 5
len([1, 2, 3]); // Returns 3
```

:::

::: lang dart

```dart
len('12345'); // Returns 5
len([1, 2, 3]); // Returns 3
```

:::

::: lang python

```python
len('12345')  # Returns 5
len([1, 2, 3])  # Returns 3
```

:::
