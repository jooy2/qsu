# getLocalIp

<NodeRequired en />

Returns the IPv4 address this machine is reachable at on its own network, such as `192.168.0.14`.

It is the address behind the default route, so a machine with several interfaces reports the one that would actually carry traffic out rather than the first one configured. No packet is sent to find it: a UDP socket is connected, which only asks the kernel which route it would take, and closed again. A machine with no route at all reports `127.0.0.1`.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The address behind the default route. A VPN that makes itself the default route is reported in place of the physical adapter.' },
	{ os: 'macos', note: 'The address behind the default route, so Wi-Fi is reported while it is the active interface and Ethernet once that takes over.' },
	{ os: 'linux', note: 'The address behind the default route. Inside a container that is the container\'s own address on its bridge, not the address of the host.' },
	{ os: 'android', note: 'The address of the active interface, which is the mobile network when Wi-Fi is off.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: 'The address of the active interface, which is the mobile network when Wi-Fi is off.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getLocalIp()); // Returns '192.168.0.14'
```

:::

::: lang dart

```dart
print(await getLocalIp()); // Returns '192.168.0.14'
```

:::

::: lang python

```python
print(getLocalIp())  # Returns '192.168.0.14'
```

:::
