# getTimezone

<NodeRequired en />

Returns the IANA name of the system time zone, such as `Asia/Seoul`.

It is the name to hand to a date library, which is why it is an IANA name rather than an offset: an offset cannot say when the clocks change.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'Windows keeps a name of its own, such as `Korea Standard Time`. The runtime maps it to the IANA name, so the answer is the same as on the other platforms.' },
	{ os: 'macos', note: 'The time zone set in System Settings.' },
	{ os: 'linux', note: 'The `TZ` environment variable where it is set, and what `/etc/localtime` points at otherwise.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getTimezone()); // Returns 'Asia/Seoul'
```

:::
