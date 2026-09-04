# getFileSize
<NodeRequired ko />

주어진 파일 경로에 대한 크기를 계산합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

<ReturnType type="Promise<number>" />

## Examples

::: lang js

```javascript
getFileSize('/home/user/test.txt'); // 300
```

:::

::: lang dart

```dart

getFileSize('/home/user/test.txt'); // 300
```

:::

::: lang python

```python
getFileSize('/home/user/test.txt') # 300
```

:::
