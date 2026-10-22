# emptyDirectory

<NodeRequired en />

Deletes all files in the specified directory path. However, the directory is preserved.

## Parameters

<ParamsTable :rows="[
	{ name: 'directoryPath', type: 'string', required: true, desc: 'Directory path' }
]" />

## Returns

<ReturnType type="Promise<void>" />

## Examples

::: lang js

```javascript
await emptyDirectory('/home/user/Downloads');
```

:::

::: lang dart

```dart
await emptyDirectory('/home/user/Downloads');
```

:::

::: lang python

```python
emptyDirectory('/home/user/Downloads')
```

:::
