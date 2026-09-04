# createDirectory <Lang js dart python />

<NodeRequired ko />

지정된 경로로 디렉토리를 생성합니다. 디렉토리가 이미 존재하는 경우, 이 작업은 무시됩니다.

해당 경로에 **파일**이 이미 있으면 오류를 그대로 전달합니다. 디렉터리로 쓸 수 있는 것이 생성되지 않았는데도 "이미 있음"으로 처리하면 잘못된 결과를 알리는 셈이기 때문입니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'recursive', type: 'boolean', named: true, default: 'true', desc: 'Recursively creates all directories in the given path.' }
]" />

## Returns

> Promise<void>

## Examples

::: lang js

```javascript
createDirectory('/home/user/a/b/c');
```

:::

::: lang dart

```dart
createDirectory('/home/user/a/b/c');
```

:::

::: lang python

```python
createDirectory('/home/user/a/b/c')
```

:::
