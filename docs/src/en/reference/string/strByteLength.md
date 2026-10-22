# strByteLength

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
strByteLength('abcd1234'); // Returns 8
strByteLength('123 ABcd 가나다😀'); // Returns 22
strByteLength('가나다'); // Returns 9
```

:::

::: lang dart

```dart
strByteLength('abcd1234'); // Returns 8
strByteLength('123 ABcd 가나다😀'); // Returns 22
strByteLength('가나다'); // Returns 9
```

:::

::: lang python

```python
strByteLength('abcd1234')  # Returns 8
strByteLength('123 ABcd 가나다😀')  # Returns 22
strByteLength('가나다')  # Returns 9
```

:::
