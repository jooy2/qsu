# isObject <Lang dart js python />

주어진 데이터가 `Object` 타입인지 확인합니다. `Array`를 포함한 다른 데이터 타입의 경우 `false`를 반환합니다.

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
