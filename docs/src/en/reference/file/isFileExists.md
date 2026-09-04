# isFileExists <Lang js dart python />

<NodeRequired en />

If a file or directory exists at the specified path, it returns `true`.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

> Promise<boolean>

## Examples

::: lang js

```javascript
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```

:::

::: lang dart

```dart
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```

:::

::: lang python

```python
isFileExists('text.txt') # True
isFileExists('not-exist.txt') # False
```

:::
