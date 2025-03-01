# isFileHidden <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 경로에 있는 파일 또는 폴더가 숨김 파일인지 확인합니다. Windows의 시스템 숨김 파일과 Linux, macOS 또는 기타 운영 체제의 `.`(점)의 유무를 확인합니다.

Windows가 파일 속성을 가져오지 못하면, 해당 파일이 숨김 파일이 아니라고 가정합니다.

## Parameters

- `filePath::string`
- `isWindows::boolean`: Whether the target operating system to be checked is Windows

## Returns

> Promise:boolean

## Examples

```javascript
await isFileHidden('text.txt'); // false
await isFileHidden('.hiddenFile'); // true
await isFileHidden('.hiddenFile', true); // false (Files with no hidden attribute applied in Windows)
```
