# toPosixFilePath <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 경로를 POSIX 형식(주로 리눅스에서 사용)의 경로로 반환합니다. 예를 들어, 윈도우 경로는 `\\` 대신 `/`로 변환됩니다.

## Parameters

- `filePath::string`

## Returns

> string

## Examples

```javascript
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```
