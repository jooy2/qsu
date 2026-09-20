# getMacAddress

<NodeRequired en />

Returns the hardware address of the first network interface that is not loopback, such as `9c:76:0e:4a:c0:e3`.

An interface that is configured but has nothing attached reports an address of all zeroes, and so does a machine with no interface at all.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The first adapter that is not loopback, in the order Windows lists them.' },
	{ os: 'macos', support: 'partial', note: 'The address currently assigned to the interface, which macOS randomises for Wi-Fi by default. It changes from one network to the next and is not the address printed on the machine.' },
	{ os: 'linux', note: 'The first interface that is not loopback, which is normally the one carrying the default route.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getMacAddress()); // Returns '9c:76:0e:4a:c0:e3'
```

:::
