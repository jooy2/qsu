# strToSnakeCase <Lang js dart python />

Converts a string to `snake_case`: every word is lowercased and joined with an underscore.

The string is split with [words](./words), so spaces, punctuation, `-` and `_` all act as delimiters, camelCase boundaries split, an acronym is separated from the word after it (`XMLHttpRequest` becomes `xml_http_request`) and a run of digits is its own word (`abc12def` becomes `abc_12_def`).

Scripts without upper and lower case keep their characters but still take part in the split, so `한글English혼합` becomes `한글_english_혼합`.

This is the counterpart of [strToCamelCase](./strToCamelCase), [strToPascalCase](./strToPascalCase), [strToKebabCase](./strToKebabCase) and [strToConstantCase](./strToConstantCase).

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to convert. An empty or missing value returns an empty string.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
strToSnakeCase('foo bar'); // Returns 'foo_bar'
strToSnakeCase('--foo-bar--'); // Returns 'foo_bar'
strToSnakeCase('camelCase'); // Returns 'camel_case'
strToSnakeCase('XMLHttpRequest'); // Returns 'xml_http_request'
strToSnakeCase('abc12def'); // Returns 'abc_12_def'
```

```dart [Dart]
strToSnakeCase('foo bar'); // Returns 'foo_bar'
strToSnakeCase('--foo-bar--'); // Returns 'foo_bar'
strToSnakeCase('camelCase'); // Returns 'camel_case'
strToSnakeCase('XMLHttpRequest'); // Returns 'xml_http_request'
strToSnakeCase('abc12def'); // Returns 'abc_12_def'
```

```python [Python]
strToSnakeCase('foo bar')  # Returns 'foo_bar'
strToSnakeCase('--foo-bar--')  # Returns 'foo_bar'
strToSnakeCase('camelCase')  # Returns 'camel_case'
strToSnakeCase('XMLHttpRequest')  # Returns 'xml_http_request'
strToSnakeCase('abc12def')  # Returns 'abc_12_def'
```

:::
