# durationParts
Breaks a duration in milliseconds into its units and returns them, leaving the caller to decide how to write them.

[duration](/reference/format/duration) joins them into a string with English unit names and an `s` for the plural, which is a rule only English follows. Polish has three plural forms and Arabic six, and no language outside English builds them by appending `s`. This function hands back the pieces so a formatter that knows the language can put them together.

## Parameters

<ParamsTable :rows="[
	{ name: 'milliseconds', type: { js: 'number', dart: 'num', python: 'float' }, required: true, desc: 'The duration to break up.' },
	{ name: 'options', type: 'DurationPartsOptions', named: true, desc: 'See the table below. These are the options of `duration` that decide which units are used; the ones that only decide how the pieces are written are left out.' }
]" />

<ParamsTable name="DurationPartsOptions" :rows="[
	{ name: 'withZeroValue', type: 'boolean', default: 'false', desc: 'Include units with a value of 0 below the largest unit.' },
	{ name: 'withMilliSeconds', type: 'boolean', default: 'false', desc: 'Include the millisecond unit.' },
	{ name: 'maxUnitCount', type: 'number', desc: 'Maximum number of units to return, counted from the largest.' },
	{ name: 'unit', type: 'DurationUnitName', desc: 'Express the whole duration with this one unit, which allows a fractional `value`.' }
]" />

## Returns

<ReturnType :type="{ js: 'DurationPart[]', dart: 'List<DurationPart>', python: 'list' }" />

<ParamsTable name="DurationPart" :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num', python: 'float' }, desc: 'How many of `unit` the duration holds. Whole in the normal case, and possibly fractional when a single `unit` was asked for.' },
	{ name: 'unit', type: 'DurationUnitName', desc: 'One of `Year`, `Month`, `Day`, `Hour`, `Minute`, `Second` and `Millisecond`. Use it to look up a unit name of your own.' }
]" />

A duration of zero returns an empty list, the same case in which `duration` returns an empty string.

## Examples

::: lang js

```javascript
durationParts(604800000); // [{ value: 7, unit: 'Day' }]
durationParts(1234567890);
// [{ value: 14, unit: 'Day' }, { value: 6, unit: 'Hour' }, { value: 56, unit: 'Minute' }, { value: 7, unit: 'Second' }]
durationParts(1234567890, { maxUnitCount: 2 });
// [{ value: 14, unit: 'Day' }, { value: 6, unit: 'Hour' }]
durationParts(1500, { unit: 'Second' }); // [{ value: 1.5, unit: 'Second' }]
```

:::

::: lang dart

```dart
final List<DurationPart> parts = durationParts(1234567890);

parts[0].value; // 14
parts[0].unit; // 'Day'

durationParts(1234567890, maxUnitCount: 2).length; // 2
durationParts(1500, unit: 'Second')[0].value; // 1.5
```

:::

::: lang python

```python
durationParts(604800000)  # [{'value': 7, 'unit': 'Day'}]
durationParts(1234567890)
# [{'value': 14, 'unit': 'Day'}, {'value': 6, 'unit': 'Hour'}, {'value': 56, 'unit': 'Minute'}, {'value': 7, 'unit': 'Second'}]
durationParts(1234567890, {'maxUnitCount': 2})
# [{'value': 14, 'unit': 'Day'}, {'value': 6, 'unit': 'Hour'}]
durationParts(1500, unit='Second')  # [{'value': 1.5, 'unit': 'Second'}]
```

:::

## Writing the duration in the reader's language

Map `unit` onto the unit names your formatter expects, and let it write the rest.

::: lang js

`Intl.DurationFormat` takes the units as an object and produces the whole string, including the separator each language uses.

```javascript
const UNITS = {
	Year: 'years',
	Month: 'months',
	Day: 'days',
	Hour: 'hours',
	Minute: 'minutes',
	Second: 'seconds',
	Millisecond: 'milliseconds'
};

function localizedDuration(milliseconds, locale) {
	const value = {};

	for (const part of durationParts(milliseconds)) {
		value[UNITS[part.unit]] = part.value;
	}

	return new Intl.DurationFormat(locale, { style: 'long' }).format(value);
}

localizedDuration(1234567890, 'de'); // '14 Tage, 6 Stunden, 56 Minuten und 7 Sekunden'
localizedDuration(1234567890, 'fr'); // '14 jours, 6 heures, 56 minutes et 7 secondes'
localizedDuration(1234567890, 'ko'); // '14일 6시간 56분 7초'
```

`Intl.DurationFormat` is newer than the rest of `Intl`, so check for it before calling it. `Intl.NumberFormat` with `style: 'unit'` covers the same seven units one at a time and has been available for far longer.

:::

::: lang dart

Add [intl](https://pub.dev/packages/intl) for the number, and take the unit name from your own translations. A language with more than two plural forms needs `Intl.plural`, which is why the count and the name are kept apart here.

```dart
const Map<String, String> unitKeys = {
  'Day': 'duration.day',
  'Hour': 'duration.hour',
  'Minute': 'duration.minute',
  'Second': 'duration.second',
};

String localizedDuration(int milliseconds, String locale) {
  return durationParts(milliseconds)
      .map((DurationPart part) =>
          translatePlural(unitKeys[part.unit]!, part.value.toInt(), locale))
      .join(' ');
}
```

:::

::: lang python

Add [babel](https://pypi.org/project/babel/), whose `format_unit` knows the unit names and the plural rules for each language.

```python
from babel.units import format_unit

unitKeys = {
	'Day': 'duration-day',
	'Hour': 'duration-hour',
	'Minute': 'duration-minute',
	'Second': 'duration-second',
}


def localizedDuration(milliseconds: float, locale: str) -> str:
	return ' '.join(
		format_unit(part['value'], unitKeys[part['unit']], locale=locale)
		for part in durationParts(milliseconds)
	)
```

:::
