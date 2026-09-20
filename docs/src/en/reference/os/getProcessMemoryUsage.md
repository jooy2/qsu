# getProcessMemoryUsage

<NodeRequired en />

Returns the physical memory this process currently occupies, as readable text with its unit.

It is the resident set: the part of the process that is in RAM right now, which is what a task manager shows against its name. Memory that has been allocated but paged out is not counted.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The working set of the process.' },
	{ os: 'macos', note: 'The resident size, which is the figure `ps` prints under `RSS`.' },
	{ os: 'linux', note: 'The resident set from `/proc/self/statm`. Memory shared with another process is counted in full here, so the figures of several processes add up to more than the machine is actually using.' },
	{ os: 'android', note: 'Reads the same `/proc` files as Linux.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: 'Answers the same system call as macOS.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getProcessMemoryUsage()); // Returns '52 MB'
```

:::

::: lang dart

```dart
print(getProcessMemoryUsage()); // Returns '52 MB'
```

:::

::: lang python

```python
print(getProcessMemoryUsage())  # Returns '20 MB'
```

:::
