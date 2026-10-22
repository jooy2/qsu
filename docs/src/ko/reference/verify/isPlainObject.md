# isPlainObject

주어진 값이 객체이면 `true`를, 배열을 포함한 그 밖의 모든 타입에는 `false`를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'data', type: 'any', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isPlainObject([1, 2, 3]); // Returns false
isPlainObject({ a: 1, b: 2 }); // Returns true
```

:::

::: lang dart

```dart
isPlainObject([1, 2, 3]); // Returns false
isPlainObject({ 'a': 1, 'b': 2 }); // Returns true
```

:::

::: lang python

```python
isPlainObject([1, 2, 3])  # Returns False
isPlainObject({'a': 1, 'b': 2})  # Returns True
```

:::
