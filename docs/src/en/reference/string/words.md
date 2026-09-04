# words <Lang dart js python />

Splits a string into the words it is made of and returns them as an array.

Anything that is neither a letter nor a digit separates words, so spaces, punctuation, `-` and `_` all act as delimiters and never appear in the result. On top of that:

- A run of digits is its own word: `'abc12def'` becomes `['abc', '12', 'def']`.
- A camelCase or PascalCase boundary splits: `'camelCase'` becomes `['camel', 'Case']`.
- The last capital of a run of capitals opens the next word, so an acronym stays whole: `'XMLHttpRequest'` becomes `['XML', 'Http', 'Request']`.
- Scripts without upper and lower case (Hangul, CJK, Thai and so on) have no camelCase boundary, but they do change word when a cased letter appears: `'한글English'` becomes `['한글', 'English']`.
- A combining mark stays attached to the letter in front of it, so a decomposed `é` is not cut in two.

The string is walked by code point, so characters outside the Basic Multilingual Plane are handled whole in every language.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to split. An empty or missing value returns an empty array.' }
]" />

## Returns

> string[]

## Examples

::: lang js

```javascript
words('fred, barney, & pebbles'); // Returns ['fred', 'barney', 'pebbles']
words('camelCase'); // Returns ['camel', 'Case']
words('XMLHttpRequest'); // Returns ['XML', 'Http', 'Request']
words('constant_case_VALUE'); // Returns ['constant', 'case', 'VALUE']
words('abc12def'); // Returns ['abc', '12', 'def']
words('한글English혼합'); // Returns ['한글', 'English', '혼합']
```

:::

::: lang dart

```dart
words('fred, barney, & pebbles'); // Returns ['fred', 'barney', 'pebbles']
words('camelCase'); // Returns ['camel', 'Case']
words('XMLHttpRequest'); // Returns ['XML', 'Http', 'Request']
words('constant_case_VALUE'); // Returns ['constant', 'case', 'VALUE']
words('abc12def'); // Returns ['abc', '12', 'def']
words('한글English혼합'); // Returns ['한글', 'English', '혼합']
```

:::

::: lang python

```python
words('fred, barney, & pebbles')  # Returns ['fred', 'barney', 'pebbles']
words('camelCase')  # Returns ['camel', 'Case']
words('XMLHttpRequest')  # Returns ['XML', 'Http', 'Request']
words('constant_case_VALUE')  # Returns ['constant', 'case', 'VALUE']
words('abc12def')  # Returns ['abc', '12', 'def']
words('한글English혼합')  # Returns ['한글', 'English', '혼합']
```

:::
