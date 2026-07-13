# deleteAllFileFromDirectory <Lang js dart python />

<NodeRequired ko />

지정된 디렉토리 경로에 있는 모든 파일을 삭제합니다. 그러나 디렉토리는 보존됩니다.

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
