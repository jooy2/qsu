# getCopyFileName <Lang js dart python />

<NodeRequired ko />

지정된 이름을 이름 리스트가 담긴 배열에서 스캔한 뒤 중복된 항목이 있으면 대체 이름을 표시하는 함수입니다. 중복된 항목이 없으면 이름이 그대로 반환됩니다.

파일 관리자의 이름 바꾸기 로직과 거의 동일합니다. 중복된 이름이 감지되면 파일명 뒤에 `(1)`, `(2)`와 같은 숫자가 붙습니다.

확장자가 포함되어 있는 경우 확장자를 유지하고 그 앞에 숫자가 붙습니다. 원본 확장자의 대소문자는 그대로 유지됩니다.

이 함수는 파일 경로에 대해서는 처리하지 않습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'fileName', type: 'string', required: true, desc: '변경할 파일 이름' },
	{ name: 'fileNameList', type: 'string[]', required: true, desc: '중복을 확인 할 파일 이름이 담긴 배열' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getCopyFileName('abc.txt', ['abc.txt', 'def.txt']); // 'abc (1).txt'
getCopyFileName('abc.txt', ['abc.txt', 'abc (1).txt']); // 'abc (2).txt'
getCopyFileName('abc (1).txt', ['abc.txt', 'abc (1).txt']); // 'abc (1) (1).txt'
getCopyFileName('def.txt', ['abc.txt']); // 'def.txt'
getCopyFileName('Report.PDF', ['Report.PDF']); // 'Report (1).PDF' (확장자 대소문자 유지)
```

```python [Python]
getCopyFileName('abc.txt', ['abc.txt', 'def.txt']) # 'abc (1).txt'
getCopyFileName('abc.txt', ['abc.txt', 'abc (1).txt']) # 'abc (2).txt'
getCopyFileName('abc (1).txt', ['abc.txt', 'abc (1).txt']) # 'abc (1) (1).txt'
getCopyFileName('def.txt', ['abc.txt']) # 'def.txt'
getCopyFileName('Report.PDF', ['Report.PDF']) # 'Report (1).PDF' (확장자 대소문자 유지)
```

:::
