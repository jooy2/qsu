# deleteAllFileFromDirectory <Lang js dart python />

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
await deleteAllFileFromDirectory('/home/user/Downloads');
```

:::

::: lang dart

```dart
await deleteAllFileFromDirectory('/home/user/Downloads');
```

:::

::: lang python

```python
deleteAllFileFromDirectory('/home/user/Downloads')
```

:::
