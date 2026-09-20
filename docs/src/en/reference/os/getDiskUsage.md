# getDiskUsage

<NodeRequired en />

Returns the share of the filesystem in use, as a percentage between `0` and `100`.

It counts every block that is not free, including the ones held back for the superuser, so it is a little higher than what [getFreeDiskSize](/reference/os/getFreeDiskSize) would suggest.

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
	{ name: 'path', type: 'string', named: true, desc: 'A path on the filesystem to measure. Any path will do; the filesystem holding it is what is measured. Defaults to the current working directory. A path that does not exist throws the filesystem error as it is.' },
	{ name: 'decimals', type: 'number', default: '1', named: true, desc: 'How many decimal places to keep. `0` returns a whole number.' }
]" />

## Returns

<ReturnType :type="{ js: 'Promise<number>', python: 'int | float' }" />

## Examples

::: lang js

```javascript
console.log(await getDiskUsage()); // Returns 88.6
console.log(await getDiskUsage('/', 0)); // Returns 89
```

:::

::: lang dart

```dart
print(await getDiskUsage()); // Returns 88.6
print(await getDiskUsage(path: '/', decimals: 0)); // Returns 89
```

:::

::: lang python

```python
print(getDiskUsage())  # Returns 88.6
print(getDiskUsage('/', 0))  # Returns 89
```

:::
