# getEndianness

<NodeRequired en />

Returns the byte order of the processor: `LE` for little-endian and `BE` for big-endian.

It matters when reading or writing a binary format that does not record the order it was written in. Every architecture a desktop runs on today is little-endian, so a program that only has to run on one will always read `LE`.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`LE` on every architecture Windows runs on.' },
	{ os: 'macos', note: '`LE` on every architecture macOS runs on.' },
	{ os: 'linux', note: '`LE` on x86 and on ARM. A big-endian build, such as one for `s390x`, reports `BE`.' },
	{ os: 'android', note: '`LE` on every device Android runs on.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: '`LE` on every device iOS runs on.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="'BE' | 'LE'" />

## Examples

::: lang js

```javascript
console.log(getEndianness()); // Returns 'LE'
```

:::

::: lang dart

```dart
print(getEndianness()); // Returns 'LE'
```

:::

::: lang python

```python
print(getEndianness())  # Returns 'LE'
```

:::
