# arrCount <Lang dart js python />

지정된 배열의 각 고유 값에 대한 중복 횟수를 반환합니다. 배열 값은 `String` 또는 `Number` 유형만 가능합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: { js: 'string[] | number[]', dart: 'List<dynamic>' }, required: true },
	{ name: 'count', type: 'number', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'object', dart: 'Map<String, int>' }" />

## Examples

::: lang js

```javascript
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

:::

::: lang dart

```dart
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd']); // Returns { a: 4, b: 2, c: 1, d: 1 }
```

:::

::: lang python

```python
arrCount(['a', 'a', 'a', 'b', 'c', 'b', 'a', 'd'])  # Returns { 'a': 4, 'b': 2, 'c': 1, 'd': 1 }
```

:::
