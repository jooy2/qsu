# getTempDir

<NodeRequired ko />

시스템이 임시 파일을 두는 디렉터리를 돌려줍니다. 끝에 구분자는 붙지 않습니다.

이 함수가 무언가를 쓰지는 않으며, 그 안의 파일이 남아 있으리라는 보장도 없습니다. 시스템이 언제든 비울 수 있습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`TEMP` 값입니다. 모두가 공유하는 폴더가 아니라 `C:\\Users\\Sam\\AppData\\Local\\Temp`처럼 프로필 안의 폴더입니다.' },
	{ os: 'macos', note: '`TMPDIR` 값입니다. 맥OS는 세션마다 `/var/folders/b7/.../T` 같은 전용 폴더를 줍니다. `/tmp`가 아닙니다.' },
	{ os: 'linux', note: '`TMPDIR`이 설정돼 있으면 그 값, 아니면 `/tmp`입니다. 기기의 모든 계정이 함께 씁니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getTempDir()); // Returns '/var/folders/b7/.../T'
```

:::

::: lang python

```python
print(getTempDir())  # Returns '/var/folders/b7/.../T'
```

:::
