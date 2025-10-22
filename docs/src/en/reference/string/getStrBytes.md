# getStrBytes <Lang dart js />

Returns the number of bytes in the given string.

## Parameters

- `str::string`

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

:::
