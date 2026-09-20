# getMachineId

<NodeRequired en />

Gets the unique UUID of the current device. Throws an error if the value is not retrieved. Returns a `Promise` object, so use `await` or `.then()` to wait for the operation to complete and get the correct value.

The UUID may change when the system is reinstalled or as the virtual machine's environment changes. On some systems, this value can also be modified by the system administrator (but this is rarely utilized as the system may become unstable after modification).

This method returns the same value for every user on the system.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The `MachineGuid` value under `HKLM\\SOFTWARE\\Microsoft\\Cryptography`.' },
	{ os: 'macos', note: 'The `IOPlatformUUID` property, read with `ioreg`.' },
	{ os: 'linux', support: 'partial', note: 'The contents of `/var/lib/dbus/machine-id` or `/etc/machine-id`. A system carrying neither falls back to the hostname, which is not unique and can be changed.' },
	{ os: 'android', note: '`/etc/machine-id` is not part of Android, so the call fails.' },
	{ os: 'ios', support: 'no', note: 'iOS does not allow a program to start another one, which this needs.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getMachineId()); // Returns 'a642d9e1-6063-4da7-8ea8-2298f989d01d'
```

:::

::: lang dart

```dart
print(await getMachineId()); // Returns 'a642d9e1-6063-4da7-8ea8-2298f989d01d'
```

:::

::: lang python

```python
print(getMachineId())  # Returns 'a642d9e1-6063-4da7-8ea8-2298f989d01d'
```

:::
