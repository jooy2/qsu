# getDiskSize

<NodeRequired en />

Returns the total size of the filesystem holding the given path, as readable text with its unit. Decimal places are rounded up, the same way [getRamSize](/reference/os/getRamSize) rounds them.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The volume holding the path. The figures honour a disk quota set on the account, so a user under a quota is told what is left of the quota rather than of the volume.' },
	{ os: 'macos', note: 'The filesystem holding the path. A mount point reports the mounted filesystem, not the one it sits in.' },
	{ os: 'linux', note: 'The filesystem holding the path. The free size leaves out the blocks reserved for the superuser, which is usually five per cent of the filesystem, so the free and the used size do not add up to the total. `df` shows the same split.' },
	{ os: 'android', languages: 'dart', note: 'The filesystem holding the path, which for an app is the one its own storage sits on.' },
	{ os: 'ios', languages: 'dart', note: 'Apple counts the disk space APIs as requiring a declared reason, so an app that ships this has to say why in its privacy manifest.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'path', type: 'string', named: true, desc: 'A path on the filesystem to measure. Any path will do; the filesystem holding it is what is measured. Defaults to the current working directory. A path that does not exist throws the filesystem error as it is.' }
]" />

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getDiskSize()); // Returns '927 GB'
console.log(await getDiskSize('/Users')); // Returns '927 GB'
```

:::

::: lang dart

```dart
print(await getDiskSize()); // Returns '927 GB'
print(await getDiskSize(path: '/Users')); // Returns '927 GB'
```

:::

::: lang python

```python
print(getDiskSize())  # Returns '927 GB'
print(getDiskSize('/Users'))  # Returns '927 GB'
```

:::
