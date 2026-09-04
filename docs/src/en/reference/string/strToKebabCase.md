# strToKebabCase <Lang js dart python />

Converts a string to `kebab-case`: every word is lowercased and joined with a hyphen.

The string is split with [words](./words), so spaces, punctuation, `-` and `_` all act as delimiters, camelCase boundaries split, an acronym is separated from the word after it (`XMLHttpRequest` becomes `xml-http-request`) and a run of digits is its own word (`abc12def` becomes `abc-12-def`).

Scripts without upper and lower case keep their characters but still take part in the split, so `한글English혼합` becomes `한글-english-혼합`.

This is a general-purpose case conversion. For a URL-friendly slug use [getSlug](../web/getSlug) instead, which also strips accents and non-Latin characters and takes a `separator` option.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to convert. An empty or missing value returns an empty string.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
strToKebabCase('foo bar'); // Returns 'foo-bar'
strToKebabCase('--foo-bar--'); // Returns 'foo-bar'
strToKebabCase('camelCase'); // Returns 'camel-case'
strToKebabCase('XMLHttpRequest'); // Returns 'xml-http-request'
strToKebabCase('abc12def'); // Returns 'abc-12-def'
```

:::

::: lang dart

```dart
strToKebabCase('foo bar'); // Returns 'foo-bar'
strToKebabCase('--foo-bar--'); // Returns 'foo-bar'
strToKebabCase('camelCase'); // Returns 'camel-case'
strToKebabCase('XMLHttpRequest'); // Returns 'xml-http-request'
strToKebabCase('abc12def'); // Returns 'abc-12-def'
```

:::

::: lang python

```python
strToKebabCase('foo bar')  # Returns 'foo-bar'
strToKebabCase('--foo-bar--')  # Returns 'foo-bar'
strToKebabCase('camelCase')  # Returns 'camel-case'
strToKebabCase('XMLHttpRequest')  # Returns 'xml-http-request'
strToKebabCase('abc12def')  # Returns 'abc-12-def'
```

:::
