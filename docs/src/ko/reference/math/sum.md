# sum <Lang js dart python />

숫자의 n개의 인수를 모두 더한 값이나 숫자의 단일 배열 값을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
sum(1, 2, 3); // Returns 6
sum([1, 2, 3, 4]); // Returns 10
```

:::

::: lang dart

```dart
sum([1, 2, 3]); // Returns 6
sum([1, 2, 3, 4]); // Returns 10
```

:::

::: lang python

```python
sum(1, 2, 3) # Returns 6
sum([1, 2, 3, 4]) # Returns 10
```

:::
