# getFreeRamSize

<NodeRequired en />

Returns the physical memory still available, as readable text with its unit. Decimal places are rounded up, the same way [getRamSize](/reference/os/getRamSize) rounds them.

What counts as available is the system's own answer, and the systems do not count the same things. Read the table below before comparing a figure across two machines.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'What `GlobalMemoryStatusEx` reports as available physical memory.' },
	{ os: 'macos', note: 'The free and speculative pages. macOS keeps a large inactive cache that is reclaimable but is not counted here, so this figure is far smaller than what Activity Monitor calls available.' },
	{ os: 'linux', note: '`MemAvailable` from `/proc/meminfo`, which counts the page cache the kernel would drop rather than swap. It is much larger than `MemFree`, and it is the number to decide whether an allocation will fit.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getFreeRamSize()); // Returns '2 GB'
```

:::

::: lang python

```python
print(getFreeRamSize())  # Returns '2 GB'
```

:::
