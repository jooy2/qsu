# getTempDir

<NodeRequired en />

Returns the directory the system puts temporary files in, without a trailing separator.

Nothing is written to it, and nothing in it is guaranteed to survive: the system may empty it at any time.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`TEMP`, which is a folder inside the profile rather than one shared by everybody, such as `C:\\Users\\Sam\\AppData\\Local\\Temp`.' },
	{ os: 'macos', note: '`TMPDIR`, which macOS gives each session a private folder for, such as `/var/folders/b7/.../T`. It is not `/tmp`.' },
	{ os: 'linux', note: '`TMPDIR` where it is set, and `/tmp` otherwise, which every account on the machine shares.' },
	{ os: 'android', note: 'The app\'s own cache directory, which the system may empty at any time.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: 'The app\'s own temporary directory inside its sandbox.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getTempDir()); // Returns '/var/folders/b7/.../T'
```

:::

::: lang dart

```dart
print(getTempDir()); // Returns '/var/folders/b7/.../T'
```

:::

::: lang python

```python
print(getTempDir())  # Returns '/var/folders/b7/.../T'
```

:::
