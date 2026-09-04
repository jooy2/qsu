# getStrBytes <Lang dart js python />

Returns the number of bytes in the given string.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
getStrBytes('abcd1234'); // Returns 8
getStrBytes('123 ABcd 가나다😀'); // Returns 22
getStrBytes('가나다'); // Returns 9
```

:::

::: lang dart

```dart
getStrBytes('abcd1234'); // Returns 8
getStrBytes('123 ABcd 가나다😀'); // Returns 22
getStrBytes('가나다'); // Returns 9
```

:::

::: lang python

```python
getStrBytes('abcd1234')  # Returns 8
getStrBytes('123 ABcd 가나다😀')  # Returns 22
getStrBytes('가나다')  # Returns 9
```

:::
