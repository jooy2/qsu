# duration <Lang dart js python />

Displays the given millisecond value in human-readable time. For example, the value of `604800000` (7 days) is displayed as `7 Days`.

A month is treated as 30 days and a year as 365 days.

## Parameters

<ParamsTable :rows="[
	{ name: 'milliseconds', type: 'number', required: true, desc: 'The duration to format, in milliseconds.' },
	{ name: 'options', type: 'DurationOptions', named: true, desc: 'Formatting options. See the table below.' }
]" />

<ParamsTable name="DurationOptions" :rows="[
	{ name: 'useShortString', type: 'boolean', default: 'false', desc: 'Use short unit labels: `Years`→`Y`, `Months`→`Mo`, `Days`→`D`, `Hours`→`H`, `Minutes`→`M`, `Seconds`→`S`, `Milliseconds`→`ms`. (`Months` uses `Mo` so it does not clash with `Minutes` (`M`).)' },
	{ name: 'useSpace', type: 'boolean', default: 'true', desc: 'Put a space between the value and its unit (e.g. `1Days` → `1 Days`).' },
	{ name: 'withZeroValue', type: 'boolean', default: 'false', desc: 'Include zero-valued units below the largest unit (e.g. `1 Day 0 Hours 0 Minutes 0 Seconds`).' },
	{ name: 'separator', type: 'string', default: `' '`, desc: 'String placed between units (e.g. `-` gives `1 Hour-10 Minutes`).' },
	{ name: 'withMilliSeconds', type: 'boolean', default: 'false', desc: 'Include the millisecond unit. When `false`, values below one second are omitted.' },
	{ name: 'maxUnitCount', type: 'number', desc: 'Maximum number of units to display, counted from the largest. Omit for unlimited.' },
	{ name: 'unit', type: 'string', desc: 'Express the whole duration with a single unit, allowing fractions (e.g. `Hour` → `48 Hours`, `0.5 Hours`). One of `Year`, `Month`, `Day`, `Hour`, `Minute`, `Second`, `Millisecond`.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
duration(1234567890); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds'
duration(1234567890, {
	withMilliSeconds: true
}); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(34560000000); // Returns '1 Year 1 Month 5 Days'
duration(34560000000, {
	maxUnitCount: 2
}); // Returns '1 Year 1 Month'
duration(172800000, {
	unit: 'Hour'
}); // Returns '48 Hours'
duration(1800000, {
	unit: 'Hour'
}); // Returns '0.5 Hours'
duration(604800000, {
	useSpace: false
}); // Returns '7Days'
```

```dart [Dart]
duration(1234567890); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds'
duration(1234567890, withMilliSeconds: true); // Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(34560000000); // Returns '1 Year 1 Month 5 Days'
duration(34560000000, maxUnitCount: 2); // Returns '1 Year 1 Month'
duration(172800000, unit: 'Hour'); // Returns '48 Hours'
duration(1800000, unit: 'Hour'); // Returns '0.5 Hours'
duration(604800000, useSpace: false); // Returns '7Days'
```

```python [Python]
duration(1234567890)  # Returns '14 Days 6 Hours 56 Minutes 7 Seconds'
duration(1234567890, {
	'withMilliSeconds': True
})  # Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(34560000000)  # Returns '1 Year 1 Month 5 Days'
duration(34560000000, {
	'maxUnitCount': 2
})  # Returns '1 Year 1 Month'
duration(172800000, {
	'unit': 'Hour'
})  # Returns '48 Hours'
duration(1800000, {
	'unit': 'Hour'
})  # Returns '0.5 Hours'
duration(604800000, {
	'useSpace': False
})  # Returns '7Days'
```

:::
