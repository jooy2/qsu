# replaceBetween <Lang dart js python />

Replaces text within a range starting and ending with a specific character in a given string with another string. For example, given the string `abc<DEF>ghi`, to change `<DEF>` to `def`, use `replaceBetween('abc<DEF>ghi', '<', '>', 'def')`. The result would be `abcdefghi`.

Deletes strings in the range if `replaceWith` is not specified.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'startChar', type: 'string', required: true },
	{ name: 'endChar', type: 'string', required: true },
	{ name: 'replaceWith', type: 'string', default: `''` }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```

```dart [Dart]
replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```

```python [Python]
replaceBetween('ab[c]d[e]f', '[', ']')  # Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e')  # Returns 'abcde'
```

:::
