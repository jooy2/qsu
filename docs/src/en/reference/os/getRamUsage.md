# getRamUsage

<NodeRequired en />

Returns the share of physical memory in use, as a percentage between `0` and `100`.

It is the same figure [getUsedRamSize](/reference/os/getUsedRamSize) reports, before the rounding that turns it into text, so it is the one to compare against a threshold.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'What `GlobalMemoryStatusEx` reports as available physical memory.' },
	{ os: 'macos', note: 'The free and speculative pages. macOS keeps a large inactive cache that is reclaimable but is not counted here, so this figure is far smaller than what Activity Monitor calls available.' },
	{ os: 'linux', note: '`MemAvailable` from `/proc/meminfo`, which counts the page cache the kernel would drop rather than swap. It is much larger than `MemFree`, and it is the number to decide whether an allocation will fit.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'decimals', type: 'number', default: '1', desc: 'How many decimal places to keep. `0` returns a whole number.' }
]" />

## Returns

<ReturnType :type="{ js: 'number', python: 'int | float' }" />

## Examples

::: lang js

```javascript
console.log(getRamUsage()); // Returns 96.5
console.log(getRamUsage(0)); // Returns 96
console.log(getRamUsage(3)); // Returns 96.466
```

:::

::: lang python

```python
print(getRamUsage())  # Returns 96.5
print(getRamUsage(0))  # Returns 96
print(getRamUsage(3))  # Returns 96.466
```

:::
