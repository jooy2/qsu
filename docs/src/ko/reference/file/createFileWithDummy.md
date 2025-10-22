# createFileWithDummy <Lang js />

<NodeRequired ko />

지정된 크기의 파일을 바이트 단위로 만듭니다.

## Parameters

- `filePath::string`: File or directory path
- `size::number`: Size of the file to be created (Dummy data is filled as much as the given size)

## Returns

> Promise::void

## Examples

```javascript
await createFileWithDummy('/home/user/test.txt', 100000);
```
