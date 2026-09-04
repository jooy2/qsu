# strToConstantCase
Converts a string to `CONSTANT_CASE`: every word is uppercased and joined with an underscore.

The string is split with [words](./words), so spaces, punctuation, `-` and `_` all act as delimiters, camelCase boundaries split, an acronym is separated from the word after it (`XMLHttpRequest` becomes `XML_HTTP_REQUEST`) and a run of digits is its own word (`abc12def` becomes `ABC_12_DEF`).

Scripts without upper and lower case keep their characters but still take part in the split, so `한글English혼합` becomes `한글_ENGLISH_혼합`.

::: warning A letter that grows when uppercased
JavaScript and Python apply the full Unicode case mapping, where Dart applies the simple one. A handful of letters that expand into two characters therefore differ: `straße` becomes `STRASSE` in JavaScript and Python, but `STRAßE` in Dart. The same holds for ligatures such as `ﬁ`. This is not papered over, because matching it would need a copy of the Unicode special-casing table in Dart.
:::

This is the uppercase counterpart of [strToSnakeCase](./strToSnakeCase).

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to convert. An empty or missing value returns an empty string.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
strToConstantCase('foo bar'); // Returns 'FOO_BAR'
strToConstantCase('--foo-bar--'); // Returns 'FOO_BAR'
strToConstantCase('camelCase'); // Returns 'CAMEL_CASE'
strToConstantCase('XMLHttpRequest'); // Returns 'XML_HTTP_REQUEST'
strToConstantCase('abc12def'); // Returns 'ABC_12_DEF'
```

:::

::: lang dart

```dart
strToConstantCase('foo bar'); // Returns 'FOO_BAR'
strToConstantCase('--foo-bar--'); // Returns 'FOO_BAR'
strToConstantCase('camelCase'); // Returns 'CAMEL_CASE'
strToConstantCase('XMLHttpRequest'); // Returns 'XML_HTTP_REQUEST'
strToConstantCase('abc12def'); // Returns 'ABC_12_DEF'
```

:::

::: lang python

```python
strToConstantCase('foo bar')  # Returns 'FOO_BAR'
strToConstantCase('--foo-bar--')  # Returns 'FOO_BAR'
strToConstantCase('camelCase')  # Returns 'CAMEL_CASE'
strToConstantCase('XMLHttpRequest')  # Returns 'XML_HTTP_REQUEST'
strToConstantCase('abc12def')  # Returns 'ABC_12_DEF'
```

:::
