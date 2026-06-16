# contains <Lang dart js python />

Returns `true` if the first string argument contains the second argument "string" or "one or more of the strings listed in the array". If the exact value is `true`, it returns true only for an exact match.

## Parameters

- `str::any[]|string`
- `search::any[]|string`
- `exact::boolean || false` <DartNamed />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
contains('abc', 'a'); // Returns true
contains('abc', 'd'); // Returns false
contains('abc', ['a', 'd']); // Returns true
```

```dart [Dart]
contains('abc', 'a'); // Returns true
contains('abc', 'd'); // Returns false
contains('abc', ['a', 'd']); // Returns true
```

```python [Python]
contains('abc', 'a')  # Returns True
contains('abc', 'd')  # Returns False
contains('abc', ['a', 'd'])  # Returns True
```

:::
