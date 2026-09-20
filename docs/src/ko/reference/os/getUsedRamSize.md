# getUsedRamSize

<NodeRequired ko />

사용 중인 물리 메모리를 단위가 붙은 읽기 쉬운 텍스트로 돌려줍니다. 전체에서 아직 쓸 수 있는 양을 뺀 값이므로, 각 시스템이 무엇을 사용 가능으로 치는지에 따라 달라집니다.

두 값 모두 단위 단위로 올림하므로, 텍스트로 읽은 사용량과 여유량의 합이 전체와 맞지 않을 수 있습니다.

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
console.log(getUsedRamSize()); // Returns '31 GB'
```

:::

::: lang dart

```dart
print(getUsedRamSize()); // Returns '31 GB'
```

:::

::: lang python

```python
print(getUsedRamSize())  # Returns '31 GB'
```

:::
