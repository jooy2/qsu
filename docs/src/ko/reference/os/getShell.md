# getShell

<NodeRequired ko />

현재 계정에 기록된 셸의 경로를 돌려줍니다.

로그인할 때 실행되는 셸이며, 지금 사용자가 쓰고 있는 셸과 늘 같지는 않습니다. 계정에는 `/bin/bash`로 기록돼 있는데 직접 `zsh`를 띄운 사용자도 여기서는 `/bin/bash`를 받습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '윈도우에는 로그인 셸이 없어 명령 해석기를 대신 돌려줍니다. 일반적인 설치에서 `C:\\Windows\\system32\\cmd.exe`인 `ComSpec` 값입니다. 사용자가 무엇을 열든 PowerShell은 나오지 않습니다.' },
	{ os: 'macos', note: '`/bin/zsh` 같은 계정 레코드의 셸입니다.' },
	{ os: 'linux', note: '`/bin/bash` 같은 패스워드 데이터베이스의 셸입니다. 항목이 없으면 환경 변수 `SHELL`을 보고, 그것도 없으면 `/bin/sh`를 씁니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getShell()); // Returns '/bin/zsh'
```

:::

::: lang python

```python
print(getShell())  # Returns '/bin/zsh'
```

:::
