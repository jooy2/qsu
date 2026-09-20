# getFreeDiskSize

<NodeRequired en />

Returns the space still writable on the filesystem holding the given path, as readable text with its unit.

This is what the current user may write, not every unused byte. On Linux and macOS a filesystem holds blocks back for the superuser, and those are not counted here, so this figure plus [getDiskUsage](/reference/os/getDiskUsage) does not come to the whole disk.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'The volume holding the path. The figures honour a disk quota set on the account, so a user under a quota is told what is left of the quota rather than of the volume.' },
	{ os: 'macos', note: 'The filesystem holding the path. A mount point reports the mounted filesystem, not the one it sits in.' },
	{ os: 'linux', note: 'The filesystem holding the path. The free size leaves out the blocks reserved for the superuser, which is usually five per cent of the filesystem, so the free and the used size do not add up to the total. `df` shows the same split.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'path', type: 'string', desc: 'A path on the filesystem to measure. Any path will do; the filesystem holding it is what is measured. Defaults to the current working directory. A path that does not exist throws the filesystem error as it is.' }
]" />

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getFreeDiskSize()); // Returns '106 GB'
```

:::

::: lang python

```python
print(getFreeDiskSize())  # Returns '106 GB'
```

:::
