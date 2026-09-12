# fileSizeFormat
Returns the given file size (in bytes) as a human-readable string.

## Parameters

<ParamsTable :rows="[
	{ name: 'bytes', type: { js: 'number', python: 'float' }, required: true, desc: 'Converts it to a human-friendly string via the bytes provided here.' },
	{ name: 'decimals', type: 'number', default: '2', named: true, desc: 'Specifies the number of decimal places to represent.' },
	{ name: 'ceil', type: 'boolean', default: 'false', named: true, desc: 'If this value is `true`, the decimal point is removed and the number is rounded up.' },
	{ name: 'options', type: 'FileSizeOptions', named: true, desc: { js: 'See the table below. JavaScript takes these as a fourth object argument, after `decimals` and `ceil`.', dart: 'See the table below.', python: 'See the table below.' } }
]" />

<ParamsTable name="FileSizeOptions" :rows="[
	{ name: 'standard', type: `'jedec' | 'iec' | 'si'`, default: `'jedec'`, desc: 'Which divisor to scale by and which unit names to write. See the table below.' },
	{ name: 'unitDisplay', type: `'short' | 'long'`, default: `'short'`, desc: 'Writes the unit as an abbreviation (`MB`) or as a whole word (`Megabytes`). The long form takes the singular when the rounded number is one.' }
]" />

Leaving both options out returns exactly the string this function has always returned.

## Standards

| `standard` | Divisor | Units               | Example for `1000000` |
| ---------- | ------- | ------------------- | --------------------- |
| `jedec`    | 1024    | `KB`, `MB`, `GB`    | `976.56 KB`           |
| `iec`      | 1024    | `KiB`, `MiB`, `GiB` | `976.56 KiB`          |
| `si`       | 1000    | `kB`, `MB`, `GB`    | `1 MB`                |

`jedec` is the default because it is what this function has always done: it divides by 1024 and writes `KB`. `iec` divides by the same 1024 and writes the prefix that actually means 1024, and `si` is the decimal one that disk manufacturers quote. Pick `iec` or `si` when the number and the unit have to agree.

The unit at exponent zero carries no prefix, so it is `Bytes` under all three.

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, 3); // '95.367 MB'
fileSizeFormat(100000000, 0, true); // '96 MB'

fileSizeFormat(1000000, 2, false, { standard: 'iec' }); // '976.56 KiB'
fileSizeFormat(1000000, 2, false, { standard: 'si' }); // '1 MB'
fileSizeFormat(1048576, 2, false, { unitDisplay: 'long' }); // '1 Megabyte'
fileSizeFormat(1234567, 2, false, { unitDisplay: 'long' }); // '1.18 Megabytes'
```

:::

::: lang dart

```dart
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, decimals: 3); // '95.367 MB'
fileSizeFormat(100000000, ceil: true); // '96 MB'

fileSizeFormat(1000000, standard: 'iec'); // '976.56 KiB'
fileSizeFormat(1000000, standard: 'si'); // '1 MB'
fileSizeFormat(1048576, unitDisplay: 'long'); // '1 Megabyte'
fileSizeFormat(1234567, unitDisplay: 'long'); // '1.18 Megabytes'
```

:::

::: lang python

```python
fileSizeFormat(1000000)  # '976.56 KB'
fileSizeFormat(100000000, 3)  # '95.367 MB'
fileSizeFormat(100000000, 0, True)  # '96 MB'

fileSizeFormat(1000000, standard='iec')  # '976.56 KiB'
fileSizeFormat(1000000, standard='si')  # '1 MB'
fileSizeFormat(1048576, unitDisplay='long')  # '1 Megabyte'
fileSizeFormat(1234567, unitDisplay='long')  # '1.18 Megabytes'
```

:::

## Writing the size in another language

The unit names above are English, and this function does not translate them. To render a size in the reader's language, take the number and the unit apart with [fileSizeParts](/reference/format/fileSizeParts) and hand them to a formatter that knows the locale.
