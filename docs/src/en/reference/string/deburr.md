# deburr <Lang dart js python />

Replaces accented Latin letters with their unaccented equivalents, so `'déjà vu'` becomes `'deja vu'`.

Letters that have no single-letter equivalent are spelled out: `Æ` becomes `Ae`, `ß` becomes `ss`, `Þ` becomes `Th`, `Œ` becomes `Oe` and `Ĳ` becomes `IJ`.

Combining marks are removed as well, so text written in a decomposed form (`e` followed by U+0301 instead of `é`) is handled too.

The mapping covers the **Latin-1 Supplement** and **Latin Extended-A** blocks, plus combining marks. That is what can be expressed as a plain table in all three languages, since Dart offers no Unicode normalization. Anything outside those blocks is returned as it is — Vietnamese `Tiếng Việt` and Hangul, CJK or Cyrillic text are left untouched.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to deburr. An empty or missing value returns an empty string.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
deburr('déjà vu'); // Returns 'deja vu'
deburr('Łódź'); // Returns 'Lodz'
deburr('Ærøskøbing'); // Returns 'Aeroskobing'
deburr('Straße'); // Returns 'Strasse'
deburr('Þór'); // Returns 'Thor'
deburr('한글'); // Returns '한글'
```

```dart [Dart]
deburr('déjà vu'); // Returns 'deja vu'
deburr('Łódź'); // Returns 'Lodz'
deburr('Ærøskøbing'); // Returns 'Aeroskobing'
deburr('Straße'); // Returns 'Strasse'
deburr('Þór'); // Returns 'Thor'
deburr('한글'); // Returns '한글'
```

```python [Python]
deburr('déjà vu')  # Returns 'deja vu'
deburr('Łódź')  # Returns 'Lodz'
deburr('Ærøskøbing')  # Returns 'Aeroskobing'
deburr('Straße')  # Returns 'Strasse'
deburr('Þór')  # Returns 'Thor'
deburr('한글')  # Returns '한글'
```

:::
