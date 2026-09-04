# createFile <Lang js dart python />

<NodeRequired ko />

빈 데이터로 된 파일을 만듭니다. 같은 파일이 이미 존재하는 경우, 그 파일은 무시됩니다.

경로에 필요한 상위 디렉터리는 파일과 함께 생성됩니다.

경로가 비어 있거나 공백뿐이면 아무 작업도 하지 않습니다. 빈 입력값이 `   `이라는 이름의 파일로 만들어지지 않도록 하기 위함입니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' }
]" />

## Returns

> Promise<void>

## Examples

::: lang js

```javascript
await createFile('/home/user/test.txt');
```

:::

::: lang dart

```dart
await createFile('/home/user/test.txt');
```

:::

::: lang python

```python
createFile('/home/user/test.txt')
```

:::
