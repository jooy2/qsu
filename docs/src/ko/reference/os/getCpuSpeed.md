# getCpuSpeed

<NodeRequired ko />

첫 번째 프로세서 코어의 클럭 속도를 메가헤르츠로 돌려줍니다.

지금 이 순간의 동작 속도가 아니라 시스템에 기록된 정격 속도이며, 기록이 없는 시스템은 `0`을 돌려줍니다. 한 플랫폼은 실제 값이 아닌 고정값을 돌려주므로, 이 값을 사람에게 보여주기 전에 아래 표를 확인하십시오.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '펌웨어가 레지스트리에 기록한 `~MHz` 값입니다.' },
	{ os: 'macos', support: 'partial', note: '인텔 맥에서는 `hw.cpufrequency` 값입니다. 애플 실리콘은 클럭 속도를 공개하지 않아 `2400`을 돌려줍니다. 측정값이 아니라 고정값이며, JavaScript 런타임 자체가 쓰는 값과 같습니다.' },
	{ os: 'linux', support: 'partial', note: 'cpufreq 드라이버가 보고하는 최대 주파수입니다. 가상 머신처럼 이 드라이버가 없는 환경에서는 `0`이 나옵니다.' },
	{ os: 'android', languages: 'dart', support: 'partial', note: '안드로이드 빌드에 따라 cpufreq 드라이버를 읽을 수 없으며, 그런 경우 `0`을 돌려줍니다.' },
	{ os: 'ios', languages: 'dart', support: 'partial', note: 'iOS는 클럭 속도를 공개하지 않아 애플 실리콘용 고정값을 돌려줍니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
console.log(getCpuSpeed()); // Returns 2400
```

:::

::: lang dart

```dart
print(getCpuSpeed()); // Returns 2400
```

:::

::: lang python

```python
print(getCpuSpeed())  # Returns 2400
```

:::
