# getPlatform

<NodeRequired ko />

프로세스가 실행 중인 운영 체제를 돌려줍니다. 값은 `windows`, `macos`, `linux`, `freebsd` 중 하나이며, 그 밖의 시스템은 `unknown`입니다.

아래의 런타임들은 이름이 제각각입니다. Node는 윈도우를 `win32`, 맥OS를 `darwin`이라 부릅니다. 두 패키지는 같은 기기에 같은 이름을 돌려주므로, 한 번 쓴 비교문이 양쪽에서 그대로 통합니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`win32`, `cygwin`, `msys`는 모두 `windows`로 보고합니다.' },
	{ os: 'macos', note: '`darwin`은 `macos`로 보고합니다.' },
	{ os: 'linux', note: '`linux`와 `android`는 모두 `linux`로 보고합니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="'windows' | 'macos' | 'linux' | 'freebsd' | 'unknown'" />

## Examples

::: lang js

```javascript
console.log(getPlatform()); // Returns 'macos'

if (getPlatform() === 'windows') {
	// ...
}
```

:::

::: lang python

```python
print(getPlatform())  # Returns 'macos'

if getPlatform() == 'windows':
	pass
```

:::
