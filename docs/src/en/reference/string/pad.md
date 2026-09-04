# pad <Lang js dart python />

Pads a string until it reaches the given length. One function covers all three directions through the `position` option, so it replaces Lodash's `pad`, `padStart` and `padEnd`.

Padding is added on both sides by default, matching Lodash's `pad`. When the two sides cannot be equal the extra character goes to the end, so `pad('abc', 8)` returns `'  abc   '`.

A `char` longer than one character is repeated and cut off where it no longer fits: `pad('abc', 8, { char: '_-' })` returns `'_-abc_-_'`.

The string is returned untouched when it is already at least `length` long, and when `char` is empty. Length is counted in code points, so a character outside the Basic Multilingual Plane counts as one in every language.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to pad. A missing value is treated as an empty string and is padded to the full length.' },
	{ name: 'length', type: 'number', required: true, desc: 'The length to pad up to, counted in code points.' },
	{ name: 'options', type: 'PadOptions', named: true, desc: 'Padding options. See the table below.' }
]" />

<ParamsTable name="PadOptions" :rows="[
	{ name: 'position', type: `'start' | 'end' | 'both'`, default: `'both'`, desc: 'Which side to pad. `both` splits the padding, giving the extra character to the end.' },
	{ name: 'char', type: 'string', default: `' '`, desc: 'The characters to pad with. A value longer than one character is repeated and truncated. An empty value returns the string untouched.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
pad('abc', 8); // Returns '  abc   '
pad('abc', 8, { char: '_-' }); // Returns '_-abc_-_'
pad('abc', 8, { position: 'start' }); // Returns '     abc'
pad('abc', 8, { position: 'end' }); // Returns 'abc     '
pad('5', 3, { position: 'start', char: '0' }); // Returns '005'
pad('abcdefgh', 4); // Returns 'abcdefgh'
```

:::

::: lang dart

```dart
pad('abc', 8); // Returns '  abc   '
pad('abc', 8, char: '_-'); // Returns '_-abc_-_'
pad('abc', 8, position: 'start'); // Returns '     abc'
pad('abc', 8, position: 'end'); // Returns 'abc     '
pad('5', 3, position: 'start', char: '0'); // Returns '005'
pad('abcdefgh', 4); // Returns 'abcdefgh'
```

:::

::: lang python

```python
pad('abc', 8)  # Returns '  abc   '
pad('abc', 8, {'char': '_-'})  # Returns '_-abc_-_'
pad('abc', 8, {'position': 'start'})  # Returns '     abc'
pad('abc', 8, {'position': 'end'})  # Returns 'abc     '
pad('5', 3, position='start', char='0')  # Returns '005'
pad('abcdefgh', 4)  # Returns 'abcdefgh'
```

:::
