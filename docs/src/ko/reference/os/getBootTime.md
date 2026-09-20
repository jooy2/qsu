# getBootTime

<NodeRequired ko />

기기가 마지막으로 부팅된 시각을 돌려줍니다.

현재 시각에서 [getSystemUptime](/ko/reference/os/getSystemUptime)을 뺀 값이라 시스템 시계를 따라 움직입니다. 계속 켜져 있던 기기라도 시계를 바꾸면 이 값이 달라집니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`GetTickCount64`으로 셉니다. 재시작하면 초기화되지만 절전으로는 초기화되지 않으므로, 절전에서 깨어난 기기는 잠들어 있던 시간까지 포함해 보고합니다.' },
	{ os: 'macos', note: '기록된 부팅 시각에서 세며, 단위는 정수 초입니다. 소수 부분을 얻을 수 없는 유일한 플랫폼이라 이 값에는 소수점이 붙지 않습니다.' },
	{ os: 'linux', note: '`/proc/uptime`에서 셉니다. 기기가 절전 상태로 있던 시간도 포함합니다.' },
	{ os: 'android', note: '리눅스와 같은 `/proc` 파일을 읽습니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: '맥OS와 같은 시스템 호출로 답합니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="Date" />

## Examples

::: lang js

```javascript
console.log(getBootTime()); // Returns 2026-09-20T00:36:22.395Z
```

:::

::: lang dart

```dart
print(getBootTime()); // Returns 2026-09-20 09:36:22.395
```

:::

::: lang python

```python
print(getBootTime())  # Returns 2026-09-20 09:36:22.988273
```

:::
