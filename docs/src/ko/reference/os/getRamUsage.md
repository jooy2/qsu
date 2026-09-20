# getRamUsage

<NodeRequired ko />

사용 중인 물리 메모리의 비율을 `0`에서 `100` 사이의 백분율로 돌려줍니다.

[getUsedRamSize](/ko/reference/os/getUsedRamSize)가 텍스트로 만들기 전의 값과 같은 값이므로, 임계값과 비교할 때는 이쪽을 쓰십시오.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`GlobalMemoryStatusEx`가 보고하는 사용 가능한 물리 메모리입니다.' },
	{ os: 'macos', note: '비어 있는 페이지와 추측 페이지입니다. 맥OS는 회수 가능한 비활성 캐시를 크게 잡아두는데 여기에는 포함하지 않으므로, 활성 상태 보기가 말하는 사용 가능 용량보다 훨씬 작습니다.' },
	{ os: 'linux', note: '`/proc/meminfo`의 `MemAvailable`입니다. 스왑 대신 버려도 되는 페이지 캐시까지 세므로 `MemFree`보다 훨씬 큽니다. 할당이 들어갈지 판단할 때 봐야 할 값이 이쪽입니다.' },
	{ os: 'android', note: '리눅스와 같은 `/proc` 파일을 읽습니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: '맥OS와 같은 시스템 호출로 답합니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'decimals', type: 'number', default: '1', named: true, desc: '남길 소수점 자릿수입니다. `0`이면 정수로 돌려줍니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'number', python: 'int | float' }" />

## Examples

::: lang js

```javascript
console.log(getRamUsage()); // Returns 96.5
console.log(getRamUsage(0)); // Returns 96
console.log(getRamUsage(3)); // Returns 96.466
```

:::

::: lang dart

```dart
print(getRamUsage()); // Returns 96.5
print(getRamUsage(decimals: 0)); // Returns 96
print(getRamUsage(decimals: 3)); // Returns 96.466
```

:::

::: lang python

```python
print(getRamUsage())  # Returns 96.5
print(getRamUsage(0))  # Returns 96
print(getRamUsage(3))  # Returns 96.466
```

:::
