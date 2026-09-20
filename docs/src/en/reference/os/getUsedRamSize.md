# getUsedRamSize

<NodeRequired en />

Returns the physical memory in use, as readable text with its unit. It is the total less what is still available, so it follows whatever each system counts as available.

Both figures are rounded up to a whole unit, so the used and the free size do not have to add up to the total when they are read as text.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'What `GlobalMemoryStatusEx` reports as available physical memory.' },
	{ os: 'macos', note: 'The free and speculative pages. macOS keeps a large inactive cache that is reclaimable but is not counted here, so this figure is far smaller than what Activity Monitor calls available.' },
	{ os: 'linux', note: '`MemAvailable` from `/proc/meminfo`, which counts the page cache the kernel would drop rather than swap. It is much larger than `MemFree`, and it is the number to decide whether an allocation will fit.' },
	{ os: 'android', languages: 'dart', note: 'Reads the same `/proc` files as Linux.' },
	{ os: 'ios', languages: 'dart', note: 'Answers the same system call as macOS.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getUsedRamSize()); // Returns '31 GB'
```

:::

::: lang dart

```dart
print(getUsedRamSize()); // Returns '31 GB'
```

:::

::: lang python

```python
print(getUsedRamSize())  # Returns '31 GB'
```

:::
