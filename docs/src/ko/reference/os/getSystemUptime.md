# getSystemUptime

<NodeRequired ko />

기기가 마지막으로 부팅된 뒤 실행된 시간을 초로 돌려줍니다.

프로세스 쪽을 세는 것은 [getUptime](/ko/reference/os/getUptime)이며, 옵션 두 개는 같습니다. `floor`는 소수점을 버리고 `format`은 천 단위로 자릿수를 끊습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`GetTickCount64`으로 셉니다. 재시작하면 초기화되지만 절전으로는 초기화되지 않으므로, 절전에서 깨어난 기기는 잠들어 있던 시간까지 포함해 보고합니다.' },
	{ os: 'macos', note: '기록된 부팅 시각에서 세며, 단위는 정수 초입니다. 소수 부분을 얻을 수 없는 유일한 플랫폼이라 이 값에는 소수점이 붙지 않습니다.' },
	{ os: 'linux', note: '`/proc/uptime`에서 셉니다. 기기가 절전 상태로 있던 시간도 포함합니다.' },
	{ os: 'android', languages: 'dart', note: '리눅스와 같은 `/proc` 파일을 읽습니다.' },
	{ os: 'ios', languages: 'dart', note: '애플은 부팅 시각 API를 사유 선언 대상으로 분류하므로, 이 함수를 포함한 앱은 privacy manifest에 사유를 적어야 합니다.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'opt', type: 'GetUptimeOption', named: true }
]" />

<ParamsTable name="GetUptimeOption" :rows="[
	{ name: 'format', type: 'boolean', default: 'false', desc: '천 단위로 자릿수를 끊어 텍스트로 돌려줍니다.' },
	{ name: 'floor', type: 'boolean', default: 'false', desc: '소수점을 버리고 정수 초로 돌려줍니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'number | string', python: 'int | float | str' }" />

## Examples

::: lang js

```javascript
console.log(getSystemUptime()); // Returns 11268
console.log(getSystemUptime({ floor: true })); // Returns 11268
console.log(getSystemUptime({ format: true })); // Returns '11,268'
```

:::

::: lang dart

```dart
print(getSystemUptime()); // Returns 11268.0
print(getSystemUptime(floor: true)); // Returns 11268
print(getSystemUptime(format: true)); // Returns '11,268'
```

:::

::: lang python

```python
print(getSystemUptime())  # Returns 11268.0
print(getSystemUptime({'floor': True}))  # Returns 11268
print(getSystemUptime({'format': True}))  # Returns '11,268'
```

:::
