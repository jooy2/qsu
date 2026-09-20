# getFreeRamSize

<NodeRequired ko />

아직 사용할 수 있는 물리 메모리를 단위가 붙은 읽기 쉬운 텍스트로 돌려줍니다. 소수점은 [getRamSize](/ko/reference/os/getRamSize)와 같은 방식으로 올림합니다.

무엇을 사용 가능으로 치는지는 시스템이 정하며, 시스템마다 세는 항목이 다릅니다. 서로 다른 기기의 값을 비교하기 전에 아래 표를 보십시오.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`GlobalMemoryStatusEx`가 보고하는 사용 가능한 물리 메모리입니다.' },
	{ os: 'macos', note: '비어 있는 페이지와 추측 페이지입니다. 맥OS는 회수 가능한 비활성 캐시를 크게 잡아두는데 여기에는 포함하지 않으므로, 활성 상태 보기가 말하는 사용 가능 용량보다 훨씬 작습니다.' },
	{ os: 'linux', note: '`/proc/meminfo`의 `MemAvailable`입니다. 스왑 대신 버려도 되는 페이지 캐시까지 세므로 `MemFree`보다 훨씬 큽니다. 할당이 들어갈지 판단할 때 봐야 할 값이 이쪽입니다.' },
	{ os: 'android', note: '리눅스와 같은 `/proc` 파일을 읽습니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: '맥OS와 같은 시스템 호출로 답합니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getFreeRamSize()); // Returns '2 GB'
```

:::

::: lang dart

```dart
print(getFreeRamSize()); // Returns '2 GB'
```

:::

::: lang python

```python
print(getFreeRamSize())  # Returns '2 GB'
```

:::
