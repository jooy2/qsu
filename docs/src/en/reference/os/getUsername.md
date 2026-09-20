# getUsername

<NodeRequired en />

Returns the name of the account the process is running as.

It is the name the system has on record for the account, not the display name a person set for themselves, and not whatever the environment says. `Unknown` is returned when the account cannot be named at all.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The account name, without the domain in front of it.' },
	{ os: 'macos', note: 'The short name from the account record, such as `sam`, not the full name shown on the login screen.' },
	{ os: 'linux', note: 'The name in the password database. A container running under a numeric id with no entry falls back to `USER` in the environment, and then to `Unknown`.' },
	{ os: 'android', note: 'The user the app process runs as, which Android names after the app rather than after a person.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: '`mobile`, which every app on the device runs as.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getUsername()); // Returns 'sam'
```

:::

::: lang dart

```dart
print(getUsername()); // Returns 'sam'
```

:::

::: lang python

```python
print(getUsername())  # Returns 'sam'
```

:::
