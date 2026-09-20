# getCpuSpeed

<NodeRequired en />

Returns the clock speed of the first processor core, in megahertz.

It is the rated speed the system records, not what the processor is running at this moment, and a system that records nothing reports `0`. Read the table below before showing this figure to anyone: one platform reports a placeholder.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The `~MHz` value the firmware writes into the registry.' },
	{ os: 'macos', support: 'partial', note: 'The `hw.cpufrequency` control, on an Intel Mac. Apple Silicon does not publish its clock speed at all, and `2400` is reported there instead. That is a placeholder rather than a measurement, and it is the same one the JavaScript runtime itself reports.' },
	{ os: 'linux', support: 'partial', note: 'The maximum frequency the cpufreq driver reports. A machine with no such driver, which is the usual case inside a virtual machine, reports `0`.' },
	{ os: 'android', languages: 'dart', support: 'partial', note: 'The cpufreq driver is not readable on every Android build, and `0` is returned where it is not.' },
	{ os: 'ios', languages: 'dart', support: 'partial', note: 'iOS does not publish its clock speed, and the placeholder for Apple Silicon is returned.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
console.log(getCpuSpeed()); // Returns 2400
```

:::

::: lang dart

```dart
print(getCpuSpeed()); // Returns 2400
```

:::

::: lang python

```python
print(getCpuSpeed())  # Returns 2400
```

:::
