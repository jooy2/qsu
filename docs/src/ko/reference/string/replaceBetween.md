# replaceBetween <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Replaces text within a range starting and ending with a specific character in a given string with another string. For example, given the string `abc<DEF>ghi`, to change `<DEF>` to `def`, use `replaceBetween('abc<DEF>ghi', '<', '>', 'def')`. The result would be `abcdefghi`.

Deletes strings in the range if `replaceWith` is not specified.

## Parameters

- `str::string`
- `startChar::string`
- `endChar::string`
- `replaceWith::string || ''`

## Returns

> string

## Examples

```javascript
replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```
