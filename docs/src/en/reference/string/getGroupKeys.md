# getGroupKeys <Lang js />

Returns a text key enclosed between the start and end characters in the given string. This can be useful for identifying template string keys in strings that follow i18n syntax.

For example, in text like `abc {def} ghi`, `{def}` is a key used in template strings, and this function seeks to find 'def'.

Given a string like `abc {def} {ghi} jkl`, executing the function with the start character `{` and end character `}` passes the keys in order to an array: `['def', 'ghi']`

Generally, characters other than `_`, `-`, or `$` (which are allowed in i18n) included in key names, or the presence of escape characters, will not be treated as keys. However, you can optionally ignore key checks for special characters.

Even when there is no key name, such as `{}`, it is treated as a valid key. In this case, empty values are placed in the array in the correct order. (Example: `['', 'abc', 'def', '', 'ghi']`)

## Parameters

- `str::string`
- `groupStart::string`
- `groupEnd::string`
- `ignoreValidation::boolean`

## Returns

> string[]

## Examples

::: code-group

```javascript [JavaScript]
getGroupKeys('abc {def} ghi {{jkl}}', '{', '}'); // Returns ['def']
getGroupKeys('abc {{def}} ghi {jkl}', '{{', '}}'); // Returns ['def']
getGroupKeys('abc {} {}', '{', '}'); // Returns ['', '']
getGroupKeys('abc [[def] [ghi] [jkl ', '[', ']'); // Returns ['ghi']
getGroupKeys('abc {d#e  f}', '{', '}', true); // Returns ['d#e  f']
```

:::
