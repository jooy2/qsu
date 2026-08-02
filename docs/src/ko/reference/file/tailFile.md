# tailFile <Lang js dart python />

<NodeRequired ko />

지정된 텍스트 파일 경로의 마지막 줄을 반환합니다. `length` 인수는 인쇄할 총 줄 수입니다. 기본값은 `1`입니다. 줄 바꿈 문자의 마지막 줄은 무시됩니다.

파일 끝에서부터 청크 단위로 거슬러 읽어, 요청한 줄 수를 확보하면 멈춥니다. 비용이 파일 크기가 아니라 요청한 줄 수를 따라가므로, 10GB 로그의 마지막 줄을 읽는 비용이 작은 파일과 같습니다.

줄은 `\n`, `\r\n`, 단독 `\r`에서 나뉩니다. 올바른 UTF-8이 아닌 바이트는 예외를 발생시키지 않고 대체 문자 `U+FFFD`가 되며, 맨 앞의 바이트 순서 표식(BOM)은 그대로 유지됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'length', type: 'number', named: true, default: '1', desc: 'Number of lines of text to return' }
]" />

## Returns

> Promise::string|null

## Examples

::: code-group

```javascript [JavaScript]
await tailFile('/home/targets/hello.md', 2); // 'Good bye\n--- Hello End ---'
```

```dart [Dart]
await tailFile('/home/targets/hello.md', length: 2); // 'Good bye\n--- Hello End ---'
```

```python [Python]
tailFile('/home/targets/hello.md', 2) # 'Good bye\n--- Hello End ---'
```

:::
