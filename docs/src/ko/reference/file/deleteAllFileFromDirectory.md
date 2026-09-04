# deleteAllFileFromDirectory
<NodeRequired ko />

지정된 디렉토리 경로에 있는 모든 파일을 삭제합니다. 그러나 디렉토리는 보존됩니다.

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
