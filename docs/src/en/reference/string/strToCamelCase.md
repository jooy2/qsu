# strToCamelCase <Lang js dart python />

Converts a string to `camelCase`: the first word is lowercased and every word after it gets an uppercase first letter, with all separators removed.

The string is split with [words](./words), so spaces, punctuation, `-` and `_` all act as delimiters, camelCase boundaries split, an acronym stays whole (`XMLHttpRequest` becomes `xmlHttpRequest`) and a run of digits is its own word (`abc12def` becomes `abc12Def`).

Scripts without upper and lower case are passed through unchanged, so `한글English혼합` stays as it is.

This is the counterpart of [strToPascalCase](./strToPascalCase), [strToSnakeCase](./strToSnakeCase), [strToKebabCase](./strToKebabCase) and [strToConstantCase](./strToConstantCase). For a URL-friendly slug use [getSlug](../web/getSlug) instead, which is built for a different purpose.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to convert. An empty or missing value returns an empty string.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
strToCamelCase('foo bar'); // Returns 'fooBar'
strToCamelCase('--foo-bar--'); // Returns 'fooBar'
strToCamelCase('__FOO_BAR__'); // Returns 'fooBar'
strToCamelCase('PascalCase'); // Returns 'pascalCase'
strToCamelCase('XMLHttpRequest'); // Returns 'xmlHttpRequest'
strToCamelCase('abc12def'); // Returns 'abc12Def'
```

```dart [Dart]
strToCamelCase('foo bar'); // Returns 'fooBar'
strToCamelCase('--foo-bar--'); // Returns 'fooBar'
strToCamelCase('__FOO_BAR__'); // Returns 'fooBar'
strToCamelCase('PascalCase'); // Returns 'pascalCase'
strToCamelCase('XMLHttpRequest'); // Returns 'xmlHttpRequest'
strToCamelCase('abc12def'); // Returns 'abc12Def'
```

```python [Python]
strToCamelCase('foo bar')  # Returns 'fooBar'
strToCamelCase('--foo-bar--')  # Returns 'fooBar'
strToCamelCase('__FOO_BAR__')  # Returns 'fooBar'
strToCamelCase('PascalCase')  # Returns 'pascalCase'
strToCamelCase('XMLHttpRequest')  # Returns 'xmlHttpRequest'
strToCamelCase('abc12def')  # Returns 'abc12Def'
```

:::
