# headFile <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 텍스트 파일 경로의 첫 줄을 반환합니다. `length` 인수는 인쇄할 총 줄 수입니다. 기본값은 `1`입니다.

## Parameters

- `filePath::string`: File or directory path
- `length::number`: Number of lines of text to return

## Returns

> Promise::string|null

## Examples

```javascript
await headFile('/home/targets/hello.md'); // '# Hello, World!'
```
