# headFile
<NodeRequired ko />

지정된 텍스트 파일 경로의 첫 줄을 반환합니다. `length` 인수는 인쇄할 총 줄 수입니다. 기본값은 `1`입니다.

요청한 줄 수에 필요한 만큼만 읽으므로, 비용이 파일 크기를 따라가지 않습니다.

줄은 `\n`, `\r\n`, 단독 `\r`에서 나뉩니다. 올바른 UTF-8이 아닌 바이트는 예외를 발생시키지 않고 대체 문자 `U+FFFD`가 되며, 맨 앞의 바이트 순서 표식(BOM)은 그대로 유지됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'length', type: 'number', named: true, default: '1', desc: 'Number of lines of text to return' }
]" />

## Returns

<ReturnType type="Promise<string | null>" />

## Examples

::: lang js

```javascript
await headFile('/home/targets/hello.md', 2); // '# Hello, World!\nSecond line'
```

:::

::: lang dart

```dart
await headFile('/home/targets/hello.md', length: 2); // '# Hello, World!\nSecond line'
```

:::

::: lang python

```python
headFile('/home/targets/hello.md', 2) # '# Hello, World!\nSecond line'
```

:::
