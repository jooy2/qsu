# getBootTime

<NodeRequired en />

Returns the moment the machine last booted.

It is the current time less [getSystemUptime](/reference/os/getSystemUptime), so it moves with the system clock: setting the clock changes what this returns for a machine that has been running the whole time.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'Counted with `GetTickCount64`, which is reset by a restart but not by a sleep, so a machine woken from sleep reports the time it spent asleep as well.' },
	{ os: 'macos', note: 'Counted from the recorded boot time, in whole seconds. macOS is the one platform where the fraction is not available, so a value here never has a decimal part.' },
	{ os: 'linux', note: 'Counted from `/proc/uptime`, which includes the time the machine spent suspended.' },
	{ os: 'android', languages: 'dart', note: 'Reads the same `/proc` files as Linux.' },
	{ os: 'ios', languages: 'dart', note: 'Answers the same system call as macOS.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="Date" />

## Examples

::: lang js

```javascript
console.log(getBootTime()); // Returns 2026-09-20T00:36:22.395Z
```

:::

::: lang dart

```dart
print(getBootTime()); // Returns 2026-09-20 09:36:22.395
```

:::

::: lang python

```python
print(getBootTime())  # Returns 2026-09-20 09:36:22.988273
```

:::
