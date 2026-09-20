# getCpuUsage

<NodeRequired en />

Returns the share of processor time spent working rather than idle, as a percentage between `0` and `100`.

There is no such thing as usage at an instant, so the figure is sampled: the processor counters are read, the call waits, and they are read again. The wait is what `interval` sets, and a longer one gives a steadier number. It covers every core together, not the calling process.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'Taken from the system-wide processor times, in which the kernel figure already includes the idle time.' },
	{ os: 'macos', note: 'Taken from the kernel\'s own tick counters, summed over every core.' },
	{ os: 'linux', note: 'Taken from `/proc/stat`. The time spent waiting on I/O, and the time a hypervisor stole from this machine, are counted as neither work nor idle, so a busy virtual machine can read lower here than its host would say.' },
	{ os: 'android', languages: 'dart', note: 'Reads the same `/proc` files as Linux.' },
	{ os: 'ios', languages: 'dart', note: 'Answers the same system call as macOS.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'interval', type: 'number', default: '100', named: true, desc: 'How long to sample for, in milliseconds. `0` returns `0`, there being no time to measure over.' },
	{ name: 'decimals', type: 'number', default: '1', named: true, desc: 'How many decimal places to keep. `0` returns a whole number.' }
]" />

## Returns

<ReturnType :type="{ js: 'Promise<number>', python: 'int | float' }" />

## Examples

::: lang js

```javascript
console.log(await getCpuUsage()); // Returns 17.8
console.log(await getCpuUsage(1000, 2)); // Returns 17.73
```

:::

::: lang dart

```dart
print(await getCpuUsage()); // Returns 17.8
print(await getCpuUsage(interval: 1000, decimals: 2)); // Returns 17.73
```

:::

::: lang python

```python
print(getCpuUsage())  # Returns 17.8
print(getCpuUsage(1000, 2))  # Returns 17.73
```

:::
