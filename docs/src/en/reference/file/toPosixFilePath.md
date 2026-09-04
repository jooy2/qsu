# toPosixFilePath <Lang js dart python />

<NodeRequired en />

Returns the given path as a path in POSIX format (usually used by Linux). For example, a Windows path will be converted to `/` instead of `\\`.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```

:::

::: lang dart

```dart
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```

:::

::: lang python

```python
toPosixFilePath('C:\\Windows\\System32') # 'C:/Windows/System32'
```

:::
