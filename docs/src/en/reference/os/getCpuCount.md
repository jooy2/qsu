# getCpuCount

<NodeRequired en />

Returns the number of processor cores this process may use.

That is not always the number of cores the machine has. A CPU affinity mask narrows it, so a process pinned to two cores of a sixteen-core machine reads `2`, which is the number to size a worker pool against.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The cores in the process affinity mask.' },
	{ os: 'macos', note: 'Every logical core, including the ones hyper-threading adds. macOS has no per-process affinity to narrow it.' },
	{ os: 'linux', note: 'The cores in the affinity mask, as `taskset` sets it. A container limited by CPU shares rather than by a mask still reads every core on the host.' },
	{ os: 'android', note: 'Reads the same `/proc` files as Linux.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: 'The cores the device has. A phone with performance and efficiency cores counts both.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
console.log(getCpuCount()); // Returns 10
```

:::

::: lang dart

```dart
print(getCpuCount()); // Returns 10
```

:::

::: lang python

```python
print(getCpuCount())  # Returns 10
```

:::
