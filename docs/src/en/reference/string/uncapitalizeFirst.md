# uncapitalizeFirst <Lang dart js python />

Converts the first letter of the entire string to lowercase and returns. This is the inverse of `capitalizeFirst`.

Only the first character is touched, so the rest of the string keeps its case: `'TEST'` becomes `'tEST'`.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
uncapitalizeFirst('Abcd'); // Returns 'abcd'
uncapitalizeFirst('TestWords'); // Returns 'testWords'
uncapitalizeFirst('TEST'); // Returns 'tEST'
```

```dart [Dart]
uncapitalizeFirst('Abcd'); // Returns 'abcd'
uncapitalizeFirst('TestWords'); // Returns 'testWords'
uncapitalizeFirst('TEST'); // Returns 'tEST'
```

```python [Python]
uncapitalizeFirst('Abcd')  # Returns 'abcd'
uncapitalizeFirst('TestWords')  # Returns 'testWords'
uncapitalizeFirst('TEST')  # Returns 'tEST'
```

:::
