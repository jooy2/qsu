# getCpu

<NodeRequired en />

This function returns the name of the CPU currently used by the system. Depending on the OS, the name may be incorrect or may not be retrievable.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The name recorded as `ProcessorNameString` in the registry.' },
	{ os: 'macos', note: 'The name the `machdep.cpu.brand_string` system control reports.' },
	{ os: 'linux', support: 'partial', note: { js: 'The `model name` in `/proc/cpuinfo`. An `arm64` kernel writes a numeric `CPU part` instead, which is translated to a core name such as `Cortex-A72`.', python: 'The `model name` in `/proc/cpuinfo`. An `arm64` kernel writes no such field, so the board name is used, and the architecture when there is not one of those either.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getCpu()); // e.g. 'Apple M1'...
```

:::

::: lang python

```python
print(getCpu())  # e.g. 'Apple M1'...
```

:::
