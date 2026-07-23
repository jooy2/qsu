# createFileWithDummy <Lang js dart python />

<NodeRequired ko />

지정된 크기의 파일을 바이트 단위로 만듭니다. 크기가 `0`이면 빈 파일을 만들고, 음수 크기는 오류를 발생시킵니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'size', type: 'number', required: true, named: true, desc: 'Size of the file to be created (Dummy data is filled as much as the given size)' }
]" />

## Returns

> Promise::void

## Examples

::: code-group

```javascript [JavaScript]
await createFileWithDummy('/home/user/test.txt', 100000);
// 크기 0은 빈 파일을 만들고 음수 크기는 예외를 던집니다
await createFileWithDummy('/home/user/empty.txt', 0);
```

```dart [Dart]
await createFileWithDummy('/home/user/test.txt', size: 100000);
// 크기 0은 빈 파일을 만들고 음수 크기는 예외를 던집니다
await createFileWithDummy('/home/user/empty.txt', size: 0);
```

```python [Python]
createFileWithDummy('/home/user/test.txt', 100000)
# 크기 0은 빈 파일을 만들고 음수 크기는 예외를 발생시킵니다
createFileWithDummy('/home/user/empty.txt', 0)
```

:::
