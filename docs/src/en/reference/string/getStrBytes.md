# getStrBytes <Lang dart js python />

Returns the number of bytes in the given string.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getStrBytes('abcd1234'); // Returns 8
getStrBytes('123 ABcd 가나다😀'); // Returns 22
getStrBytes('가나다'); // Returns 9
```

```dart [Dart]
getStrBytes('abcd1234'); // Returns 8
getStrBytes('123 ABcd 가나다😀'); // Returns 22
getStrBytes('가나다'); // Returns 9
```

```python [Python]
getStrBytes('abcd1234')  # Returns 8
getStrBytes('123 ABcd 가나다😀')  # Returns 22
getStrBytes('가나다')  # Returns 9
```

:::
