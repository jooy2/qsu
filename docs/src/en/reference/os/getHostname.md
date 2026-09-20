# getHostname

<NodeRequired en />

Retrieves the host name of the current device. This is usually the name of the system that was automatically set on the desktop or changed by the user.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The `COMPUTERNAME` value, which is the name set in System Properties.' },
	{ os: 'macos', note: 'The name set in System Settings, which is not the kernel hostname: `Sam\'s MacBook` against `sams-macbook.local`. The kernel hostname is used when that name cannot be read.' },
	{ os: 'linux', note: 'The static hostname in `/etc/hostname`, falling back to the kernel hostname. Nothing is run for it, so systemd does not have to be installed.' },
	{ os: 'android', note: 'The kernel host name, which on a phone is usually `localhost`.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: 'The kernel host name. The name a person gave the device is not readable without asking the user.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getHostname()); // e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::

::: lang dart

```dart
print(await getHostname()); // e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::

::: lang python

```python
print(getHostname())  # e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::
