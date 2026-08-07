# strToPascalCase <Lang js dart python />

Converts a string to `PascalCase`: every word gets an uppercase first letter and a lowercase rest, with all separators removed.

The string is split with [words](./words), so spaces, punctuation, `-` and `_` all act as delimiters, camelCase boundaries split, an acronym is separated from the word after it (`XMLHttpRequest` becomes `XmlHttpRequest`) and a run of digits is its own word (`abc12def` becomes `Abc12Def`).

Scripts without upper and lower case are passed through unchanged, so `한글English혼합` stays as it is.

This is [strToCamelCase](./strToCamelCase) with the first word capitalized as well. It is not the same as [capitalizeEachWords](./capitalizeEachWords), which keeps the original separators and only touches the first letter of each word.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to convert. An empty or missing value returns an empty string.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
strToPascalCase('foo bar'); // Returns 'FooBar'
strToPascalCase('--foo-bar--'); // Returns 'FooBar'
strToPascalCase('camelCase'); // Returns 'CamelCase'
strToPascalCase('XMLHttpRequest'); // Returns 'XmlHttpRequest'
strToPascalCase('abc12def'); // Returns 'Abc12Def'
```

```dart [Dart]
strToPascalCase('foo bar'); // Returns 'FooBar'
strToPascalCase('--foo-bar--'); // Returns 'FooBar'
strToPascalCase('camelCase'); // Returns 'CamelCase'
strToPascalCase('XMLHttpRequest'); // Returns 'XmlHttpRequest'
strToPascalCase('abc12def'); // Returns 'Abc12Def'
```

```python [Python]
strToPascalCase('foo bar')  # Returns 'FooBar'
strToPascalCase('--foo-bar--')  # Returns 'FooBar'
strToPascalCase('camelCase')  # Returns 'CamelCase'
strToPascalCase('XMLHttpRequest')  # Returns 'XmlHttpRequest'
strToPascalCase('abc12def')  # Returns 'Abc12Def'
```

:::
