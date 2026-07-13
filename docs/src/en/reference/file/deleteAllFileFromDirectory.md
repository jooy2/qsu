# deleteAllFileFromDirectory <Lang js dart python />

<NodeRequired en />

Deletes all files in the specified directory path. However, the directory is preserved.

## Parameters

<ParamsTable :rows="[
	{ name: 'directoryPath', type: 'string', required: true, desc: 'Directory path' }
]" />

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await deleteAllFileFromDirectory('/home/user/Downloads');
```

```dart [Dart]
await deleteAllFileFromDirectory('/home/user/Downloads');
```

```python [Python]
deleteAllFileFromDirectory('/home/user/Downloads')
```

:::
