# isValidFileName <Lang js dart python />

<NodeRequired ko />

전달된 경로 또는 파일 이름이 시스템에서 허용하는 문자열을 사용하는지 여부를 결정합니다(또한 유효한 파일 길이도 확인합니다). 이름을 사용할 수 없는 경우 false를 반환합니다.

확장자를 포함한 전체 이름을 검사하며, Windows 경로에서는 예약된 장치 이름(`CON`, `PRN`, `AUX`, `NUL`, `COM1`~`COM9`, `LPT1`~`LPT9`)을 거부합니다.

빈 이름과 제어 문자(`U+0000`~`U+001F`, `U+007F`)가 포함된 이름은 양쪽 모두에서 거부합니다. 특히 `NUL`은 하위 시스템 호출에서 경로를 끝내는 문자라, 이 문자가 든 이름은 거부되는 것이 아니라 파일 시스템에서 조용히 잘려나갑니다.

Windows 경로에서는 점(`.`)이나 공백으로 끝나는 이름을 거부합니다. Windows는 오류를 내지 않고 그 문자를 잘라내므로, 실제로 디스크에 생기는 이름이 요청한 이름과 달라지기 때문입니다. Unix는 그대로 유지하므로 `unixType`에서는 유효합니다.

길이 제한은 255자가 아니라 **255바이트**이며, 이는 ext4·APFS·NTFS가 실제로 강제하는 값입니다. `'가' * 100`은 100자이지만 300바이트라서 만들 수 없습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true, desc: 'File or directory path' },
	{ name: 'unixType', type: 'boolean', named: true, desc: 'Passes true if the file type is unix type.' }
]" />

## Returns

> boolean

## Examples

::: lang js

```javascript
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', true); // true
// 확장자가 붙어도 Windows 예약 장치 이름은 여전히 무효
isValidFileName('nul.txt'); // false
isValidFileName('nul.txt', true); // true
// 빈 이름, 제어 문자, 끝의 점 또는 공백
isValidFileName(''); // false
isValidFileName('report.'); // false (Unix에서는 유효)
// 255자가 아니라 255바이트
isValidFileName('가'.repeat(85)); // true (255바이트)
isValidFileName('가'.repeat(86)); // false (258바이트)
```

:::

::: lang dart

```dart
isValidFileName('C:\\Windows\\System32*'); // false
isValidFileName('/home/user/.bashrc', unixType: true); // true
// 확장자가 붙어도 Windows 예약 장치 이름은 여전히 무효
isValidFileName('nul.txt'); // false
isValidFileName('nul.txt', unixType: true); // true
```

:::

::: lang python

```python
isValidFileName('C:\\Windows\\System32*') # False
isValidFileName('/home/user/.bashrc', True) # True
# 확장자가 붙어도 Windows 예약 장치 이름은 여전히 무효
isValidFileName('nul.txt') # False
isValidFileName('nul.txt', True) # True
```

:::
