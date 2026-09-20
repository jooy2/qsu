# getUptime

<NodeRequired en />

Returns the number of seconds the current process has been running.

`floor` drops the fraction, and `format` groups the digits in thousands. `format` on its own formats the unrounded value, so pass both to read `1,234`.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: { js: 'Counted from the moment the process started.', python: 'Counted from the creation time `GetProcessTimes` reports for the process.' } },
	{ os: 'macos', note: { js: 'Counted from the moment the process started.', python: 'Counted from the start time the kernel records for the process.' } },
	{ os: 'linux', note: { js: 'Counted from the moment the process started.', python: 'Counted from the start time in `/proc/self/stat`. Where `/proc` is not mounted, the count starts when `qsu` was first imported instead.' } }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'opt', type: 'GetUptimeOption', named: true }
]" />

<ParamsTable name="GetUptimeOption" :rows="[
	{ name: 'format', type: 'boolean', default: 'false' },
	{ name: 'floor', type: 'boolean', default: 'false' }
]" />

## Returns

<ReturnType :type="{ js: 'number | string', python: 'int | float | str' }" />

## Examples

::: lang js

```javascript
console.log(getUptime()); // Returns 1234.123456789
console.log(getUptime({ floor: true })); // Returns 1234
console.log(getUptime({ format: true })); // Returns '1,234.123456789'
console.log(getUptime({ floor: true, format: true })); // Returns '1,234'
```

:::

::: lang python

```python
print(getUptime())  # Returns 1234.123456789
print(getUptime({'floor': True}))  # Returns 1234
print(getUptime({'format': True}))  # Returns '1,234.123456789'
print(getUptime({'floor': True, 'format': True}))  # Returns '1,234'
```

:::
