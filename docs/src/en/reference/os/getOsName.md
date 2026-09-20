# getOsName

<NodeRequired en />

Returns the name of the operating system as a person would say it, such as `macOS 26.6.2`, `Windows 11` or `Ubuntu 24.04.2 LTS`.

This is the one to print. [getKernelVersion](/reference/os/getKernelVersion) answers with the kernel version, which is a different number on every platform, and [getPlatform](/reference/os/getPlatform) answers with a name to compare against in code.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'Worked out from the build number: `Windows 11` from build 22000 up and `Windows 10` below it. The registry is not used, because it still calls Windows 11 `Windows 10`. The edition is not included.' },
	{ os: 'macos', note: 'The product version Apple markets, such as `macOS 26.6.2`, read from the system version file. The Darwin version is several numbers lower.' },
	{ os: 'linux', note: '`PRETTY_NAME` from `/etc/os-release`, which is the name a distribution gives itself. A system carrying no such file reports `Linux`.' },
	{ os: 'android', languages: 'dart', note: '`PRETTY_NAME` where the build carries `os-release`, and `Android` otherwise. It is not the Android version a person would name.' },
	{ os: 'ios', languages: 'dart', note: 'The iOS version, such as `iOS 18.5`.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getOsName()); // Returns 'macOS 26.6.2'
```

:::

::: lang dart

```dart
print(await getOsName()); // Returns 'macOS 26.6.2'
```

:::

::: lang python

```python
print(getOsName())  # Returns 'macOS 26.6.2'
```

:::
