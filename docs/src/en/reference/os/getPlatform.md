# getPlatform

<NodeRequired en />

Returns the operating system the process is running on, as one of `windows`, `macos`, `linux` and `freebsd`. Anything else is `unknown`.

The runtimes underneath do not agree on these names: Node calls Windows `win32` and macOS `darwin`. Both packages answer with the same name for the same machine, so a comparison written once holds in either.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`win32`, `cygwin` and `msys` are all reported as `windows`.' },
	{ os: 'macos', note: '`darwin` is reported as `macos`.' },
	{ os: 'linux', note: '`linux` and `android` are both reported as `linux`.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="'windows' | 'macos' | 'linux' | 'freebsd' | 'unknown'" />

## Examples

::: lang js

```javascript
console.log(getPlatform()); // Returns 'macos'

if (getPlatform() === 'windows') {
	// ...
}
```

:::

::: lang python

```python
print(getPlatform())  # Returns 'macos'

if getPlatform() == 'windows':
	pass
```

:::
