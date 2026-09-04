# escapeRegExp <Lang dart js python />

Escapes every regular expression metacharacter in the given string, so the value can be dropped into a pattern and matched literally.

The escaped set is `^`, `$`, `.`, `*`, `+`, `?`, `(`, `)`, `[`, `]`, `{`, `}`, `|` and `\` — the union of what JavaScript, Dart and Python all read as syntax **outside** a character class.

`-` and `#` are deliberately left alone. They are special only inside a character class or in Python's verbose mode, and in JavaScript's unicode mode `\-` outside a character class is itself a syntax error. If you are building a character class, escape those two yourself.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to escape. An empty or missing value returns an empty string.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
escapeRegExp('1 + 1 = 2'); // Returns '1 \\+ 1 = 2'
escapeRegExp('[qsu](https://qsu.cdget.com/)'); // Returns '\\[qsu\\]\\(https://qsu\\.cdget\\.com/\\)'
escapeRegExp('a-z #1'); // Returns 'a-z #1'

new RegExp(escapeRegExp('a.b')).test('a.b'); // Returns true
new RegExp(escapeRegExp('a.b')).test('axb'); // Returns false
```

:::

::: lang dart

```dart
escapeRegExp('1 + 1 = 2'); // Returns '1 \\+ 1 = 2'
escapeRegExp('[qsu](https://qsu.cdget.com/)'); // Returns '\\[qsu\\]\\(https://qsu\\.cdget\\.com/\\)'
escapeRegExp('a-z #1'); // Returns 'a-z #1'

RegExp(escapeRegExp('a.b')).hasMatch('a.b'); // Returns true
RegExp(escapeRegExp('a.b')).hasMatch('axb'); // Returns false
```

:::

::: lang python

```python
escapeRegExp('1 + 1 = 2')  # Returns '1 \\+ 1 = 2'
escapeRegExp('[qsu](https://qsu.cdget.com/)')  # Returns '\\[qsu\\]\\(https://qsu\\.cdget\\.com/\\)'
escapeRegExp('a-z #1')  # Returns 'a-z #1'

bool(re.search(escapeRegExp('a.b'), 'a.b'))  # Returns True
bool(re.search(escapeRegExp('a.b'), 'axb'))  # Returns False
```

:::
