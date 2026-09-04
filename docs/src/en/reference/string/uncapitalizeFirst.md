# uncapitalizeFirst
Converts the first letter of the entire string to lowercase and returns. This is the inverse of `capitalizeFirst`.

Only the first character is touched, so the rest of the string keeps its case: `'TEST'` becomes `'tEST'`.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
uncapitalizeFirst('Abcd'); // Returns 'abcd'
uncapitalizeFirst('TestWords'); // Returns 'testWords'
uncapitalizeFirst('TEST'); // Returns 'tEST'
```

:::

::: lang dart

```dart
uncapitalizeFirst('Abcd'); // Returns 'abcd'
uncapitalizeFirst('TestWords'); // Returns 'testWords'
uncapitalizeFirst('TEST'); // Returns 'tEST'
```

:::

::: lang python

```python
uncapitalizeFirst('Abcd')  # Returns 'abcd'
uncapitalizeFirst('TestWords')  # Returns 'testWords'
uncapitalizeFirst('TEST')  # Returns 'tEST'
```

:::
