# strByteLength

주어진 문자열의 바이트 수를 계산하여 리턴합니다.

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
