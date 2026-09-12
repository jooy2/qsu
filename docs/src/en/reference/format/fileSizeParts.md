# fileSizeParts
Splits a file size in bytes into the scaled number and the unit it belongs to, leaving the caller to decide how to write them.

[fileSizeFormat](/reference/format/fileSizeFormat) joins the two with a space and English unit names, which is the wrong string in most of the world: German writes the decimal separator as a comma, and French calls a megabyte a `Mo`. This function hands back the pieces so a formatter that knows the locale can put them together.

## Parameters

<ParamsTable :rows="[
	{ name: 'bytes', type: { js: 'number', python: 'float' }, required: true, desc: 'The file size in bytes.' },
	{ name: 'options', type: 'FileSizeOptions', named: true, desc: 'See the table below.' }
]" />

<ParamsTable name="FileSizeOptions" :rows="[
	{ name: 'standard', type: `'jedec' | 'iec' | 'si'`, default: `'jedec'`, desc: 'Which divisor to scale by and which unit names to write. `jedec` divides by 1024 and writes `KB`, `iec` divides by 1024 and writes `KiB`, and `si` divides by 1000 and writes `kB`.' },
	{ name: 'unitDisplay', type: `'short' | 'long'`, default: `'short'`, desc: 'Writes `unit` as an abbreviation (`MB`) or as a whole word (`Megabytes`). The long form takes the singular when the value is one.' }
]" />

## Returns

<ReturnType :type="{ js: 'FileSizeParts', dart: 'FileSizeParts', python: 'dict' }" />

<ParamsTable name="FileSizeParts" :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num', python: 'float' }, desc: 'The size expressed in `unit`. It is **not** rounded, so your own formatter rounds it once rather than rounding an already rounded number.' },
	{ name: 'unit', type: 'string', desc: 'The unit `value` is expressed in, spelled for the chosen `standard` and `unitDisplay`.' },
	{ name: 'exponent', type: 'number', desc: 'How many times the size was divided by the base of the standard. `0` is bytes, `1` kilobytes, `2` megabytes, and so on. Use it to look up a unit name of your own.' }
]" />

## Examples

::: lang js

```javascript
fileSizeParts(1234567); // { value: 1.1773748397827148, unit: 'MB', exponent: 2 }
fileSizeParts(1000000, { standard: 'si' }); // { value: 1, unit: 'MB', exponent: 2 }
fileSizeParts(1048576, { standard: 'iec' }); // { value: 1, unit: 'MiB', exponent: 2 }
fileSizeParts(1048576, { unitDisplay: 'long' }); // { value: 1, unit: 'Megabyte', exponent: 2 }
```

:::

::: lang dart

```dart
final FileSizeParts parts = fileSizeParts(1234567);

parts.value; // 1.1773748397827148
parts.unit; // 'MB'
parts.exponent; // 2

fileSizeParts(1000000, standard: 'si').unit; // 'MB'
fileSizeParts(1048576, unitDisplay: 'long').unit; // 'Megabyte'
```

:::

::: lang python

```python
fileSizeParts(1234567)  # {'value': 1.1773748397827148, 'unit': 'MB', 'exponent': 2}
fileSizeParts(1000000, standard='si')  # {'value': 1.0, 'unit': 'MB', 'exponent': 2}
fileSizeParts(1048576, standard='iec')  # {'value': 1.0, 'unit': 'MiB', 'exponent': 2}
fileSizeParts(1048576, unitDisplay='long')  # {'value': 1.0, 'unit': 'Megabyte', 'exponent': 2}
```

:::

## Writing the size in the reader's language

Map `exponent` onto the unit names your formatter expects, and let it write the number.

::: lang js

`Intl.NumberFormat` takes a unit name and produces the whole string, including the space, which some languages leave out. Building one is expensive, so cache it by the arguments it was built from.

```javascript
const UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte'];
const formatters = new Map();

function localizedFileSize(bytes, locale, decimals = 2) {
	const { value, exponent } = fileSizeParts(bytes, { standard: 'si' });
	const key = [locale, exponent, decimals].join('|');
	let formatter = formatters.get(key);

	if (!formatter) {
		formatter = new Intl.NumberFormat(locale, {
			style: 'unit',
			unit: UNITS[exponent],
			unitDisplay: 'short',
			maximumFractionDigits: decimals
		});

		formatters.set(key, formatter);
	}

	return formatter.format(value);
}

localizedFileSize(1234567, 'de-DE'); // '1,23 MB'
localizedFileSize(1234567, 'fr-FR'); // '1,23 Mo'
localizedFileSize(1234567, 'ko-KR'); // '1.23MB'
```

`Intl.NumberFormat` knows these units only up to `petabyte` and throws a `RangeError` above it, so check `exponent` before reaching into `UNITS` if you handle sizes that large. Its unit names are decimal, which is why the example asks for `si`. Pass `jedec` or `iec` and the number no longer matches the name it is given.

A runtime built with a trimmed ICU has data for English only, and falls back to it without saying so.

:::

::: lang dart

Add [intl](https://pub.dev/packages/intl) and use `NumberFormat` for the number, then append a unit name from your own translations. `intl` formats the number, not the unit.

```dart
const List<String> unitKeys = ['byte', 'kilobyte', 'megabyte', 'gigabyte'];

String localizedFileSize(int bytes, String locale) {
  final FileSizeParts parts = fileSizeParts(bytes, standard: 'si');
  final String number =
      NumberFormat.decimalPatternDigits(locale: locale, decimalDigits: 2)
          .format(parts.value);

  return '$number ${translate(unitKeys[parts.exponent])}';
}
```

:::

::: lang python

Add [babel](https://pypi.org/project/babel/) and use `format_decimal` for the number, then append a unit name from your own translations.

```python
from babel.numbers import format_decimal

unitKeys = ['byte', 'kilobyte', 'megabyte', 'gigabyte']


def localizedFileSize(size: int, locale: str) -> str:
	parts = fileSizeParts(size, standard='si')
	number = format_decimal(parts['value'], format='#,##0.##', locale=locale)

	return f"{number} {translate(unitKeys[parts['exponent']])}"
```

:::
