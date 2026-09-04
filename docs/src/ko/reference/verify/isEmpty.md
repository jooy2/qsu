# isEmpty <Lang dart js python />

전달된 데이터가 비어 있거나 길이가 0이면 true를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isEmpty([]); // Returns true
isEmpty(''); // Returns true
isEmpty('abc'); // Returns false
```

:::

::: lang dart

```dart
isEmpty([]); // Returns true
isEmpty(''); // Returns true
isEmpty('abc'); // Returns false
```

:::

::: lang python

```python
isEmpty([])  # Returns True
isEmpty('')  # Returns True
isEmpty('abc')  # Returns False
```

:::
