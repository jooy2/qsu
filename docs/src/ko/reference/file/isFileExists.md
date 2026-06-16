# isFileExists <Lang js dart python />

<NodeRequired ko />

지정된 경로에 대한 파일이나 디렉토리가 존재하면 `true`를 반환합니다.

## Parameters

- `filePath::string`

## Returns

> Promise:boolean

## Examples

```javascript
await isFileExists('text.txt'); // true
await isFileExists('not-exist.txt'); // false
```

```python
isFileExists('text.txt') # True
isFileExists('not-exist.txt') # False
```
