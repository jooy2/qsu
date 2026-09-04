# contains <Lang dart js python />

Returns `true` if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is `true`, it returns true only for an exact match.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'any[] | string', required: true },
	{ name: 'search', type: 'any[] | string', required: true },
	{ name: 'exact', type: 'boolean', default: 'false', named: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
contains('abc', 'a'); // Returns true
contains('abc', 'd'); // Returns false
contains('abc', ['a', 'd']); // Returns true
```

:::

::: lang dart

```dart
contains('abc', 'a'); // Returns true
contains('abc', 'd'); // Returns false
contains('abc', ['a', 'd']); // Returns true
```

:::

::: lang python

```python
contains('abc', 'a')  # Returns True
contains('abc', 'd')  # Returns False
contains('abc', ['a', 'd'])  # Returns True
```

:::
