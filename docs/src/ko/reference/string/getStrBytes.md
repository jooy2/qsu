# getStrBytes <Lang dart js python />

주어진 문자열의 바이트 수를 계산하여 리턴합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

> number

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
