# isValidFileName <Lang js dart python />

<NodeRequired ko />

전달된 경로 또는 파일 이름이 시스템에서 허용하는 문자열을 사용하는지 여부를 결정합니다(또한 유효한 파일 길이도 확인합니다). 이름을 사용할 수 없는 경우 false를 반환합니다.

확장자를 포함한 전체 이름을 검사하며, Windows 경로에서는 예약된 장치 이름(`CON`, `PRN`, `AUX`, `NUL`, `COM1`~`COM9`, `LPT1`~`LPT9`)을 거부합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'unixType', type: 'boolean', named: true, desc: 'Passes true if the file type is unix type.' }
]" />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', true); // true
// 확장자가 붙어도 Windows 예약 장치 이름은 여전히 무효
isValidFileName('nul.txt'); // false
isValidFileName('nul.txt', true); // true
```

```dart [Dart]
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', unixType: true); // true
// 확장자가 붙어도 Windows 예약 장치 이름은 여전히 무효
isValidFileName('nul.txt'); // false
isValidFileName('nul.txt', unixType: true); // true
```

```python [Python]
isValidFileName('C:\\Windows\\System32*') # False
isValidFileName('/home/user/.bashrc', True) # True
# 확장자가 붙어도 Windows 예약 장치 이름은 여전히 무효
isValidFileName('nul.txt') # False
isValidFileName('nul.txt', True) # True
```

:::
