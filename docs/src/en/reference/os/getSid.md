# getSid

<NodeRequired en />

Gets the Security Identifier (SID) value for the current user on the device. Throws an error if the value is not obtained.

The SID macOS returns is a value created for the directory service. Where that is not what you want, [getMachineId](/reference/os/getMachineId) identifies the machine instead.

This value can be changed by the user.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The SID of the profile whose folder is this user\'s home directory.' },
	{ os: 'macos', support: 'partial', note: 'The SID the directory service generated for the account. It is not a Windows SID and means nothing outside this machine.' },
	{ os: 'linux', support: 'no', note: 'Linux has no SID. The call throws.' },
	{ os: 'android', support: 'no', note: 'Android has no SID. The call throws.' },
	{ os: 'ios', support: 'no', note: 'iOS has no SID. The call throws.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getSid()); // Returns 'S-1-5-21-406418252-5582013529-1321253100-2001'
```

:::

::: lang dart

```dart
print(await getSid()); // Returns 'S-1-5-21-406418252-5582013529-1321253100-2001'
```

:::

::: lang python

```python
print(getSid())  # Returns 'S-1-5-21-406418252-5582013529-1321253100-2001'
```

:::
