# getSystemUptime

<NodeRequired en />

Returns the number of seconds the machine has been running since it last booted.

[getUptime](/reference/os/getUptime) counts the process instead, and takes the same two options: `floor` drops the fraction, and `format` groups the digits in thousands.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'Counted with `GetTickCount64`, which is reset by a restart but not by a sleep, so a machine woken from sleep reports the time it spent asleep as well.' },
	{ os: 'macos', note: 'Counted from the recorded boot time, in whole seconds. macOS is the one platform where the fraction is not available, so a value here never has a decimal part.' },
	{ os: 'linux', note: 'Counted from `/proc/uptime`, which includes the time the machine spent suspended.' },
	{ os: 'android', note: 'Reads the same `/proc` files as Linux.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: 'Apple counts the boot time APIs as requiring a declared reason, so an app that ships this has to say why in its privacy manifest.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'opt', type: 'GetUptimeOption', named: true }
]" />

<ParamsTable name="GetUptimeOption" :rows="[
	{ name: 'format', type: 'boolean', default: 'false', desc: 'Group the digits in thousands and return the result as text.' },
	{ name: 'floor', type: 'boolean', default: 'false', desc: 'Drop the fraction and return a whole number of seconds.' }
]" />

## Returns

<ReturnType :type="{ js: 'number | string', python: 'int | float | str' }" />

## Examples

::: lang js

```javascript
console.log(getSystemUptime()); // Returns 11268
console.log(getSystemUptime({ floor: true })); // Returns 11268
console.log(getSystemUptime({ format: true })); // Returns '11,268'
```

:::

::: lang dart

```dart
print(getSystemUptime()); // Returns 11268.0
print(getSystemUptime(floor: true)); // Returns 11268
print(getSystemUptime(format: true)); // Returns '11,268'
```

:::

::: lang python

```python
print(getSystemUptime())  # Returns 11268.0
print(getSystemUptime({'floor': True}))  # Returns 11268
print(getSystemUptime({'format': True}))  # Returns '11,268'
```

:::
