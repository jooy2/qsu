# getKernelVersion

<NodeRequired en />

Returns the version of the operating system kernel.

This is not the version a user would name. macOS 26 reports the Darwin version `25.6.0`, and Windows 11 reports the NT version `10.0.26100`. Use it to tell kernels apart, not to print a version for someone to read.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The NT version, such as `10.0.26100`. Windows 10 and Windows 11 both report `10.0`, so it is the build number after it that separates them.' },
	{ os: 'macos', note: 'The Darwin kernel version, such as `25.6.0`. It is not the macOS version, which is several numbers higher.' },
	{ os: 'linux', note: 'The kernel release, such as `6.8.0-45-generic`. Most distributions add a suffix of their own to it.' },
	{ os: 'android', languages: 'dart', note: 'The Linux kernel release the device was built with.' },
	{ os: 'ios', languages: 'dart', note: 'The Darwin kernel version, as on macOS.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getKernelVersion()); // Returns '25.6.0'
```

:::

::: lang dart

```dart
print(getKernelVersion()); // Returns '25.6.0'
```

:::

::: lang python

```python
print(getKernelVersion())  # Returns '25.6.0'
```

:::
