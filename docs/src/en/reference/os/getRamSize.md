# getRamSize

<NodeRequired en />

Retrieves the total RAM size of the current device. Returns it as readable text including the unit. Decimal places are rounded up.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The installed physical memory, as `GlobalMemoryStatusEx` reports it.' },
	{ os: 'macos', note: 'The installed physical memory.' },
	{ os: 'linux', note: 'The physical memory the kernel manages. It is a little under what is installed, because firmware and the kernel reserve part of it.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getRamSize()); // Returns '8 GB'
```

:::

::: lang python

```python
print(getRamSize())  # Returns '8 GB'
```

:::
