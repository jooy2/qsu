# isObject
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
isObject([1, 2, 3]); // Returns false
isObject({ a: 1, b: 2 }); // Returns true
```

:::

::: lang dart

```dart
isObject([1, 2, 3]); // Returns false
isObject({ 'a': 1, 'b': 2 }); // Returns true
```

:::

::: lang python

```python
isObject([1, 2, 3])  # Returns False
isObject({'a': 1, 'b': 2})  # Returns True
```

:::
