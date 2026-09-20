# getProcessMemoryUsage

<NodeRequired ko />

이 프로세스가 현재 차지하고 있는 물리 메모리를 단위가 붙은 읽기 쉬운 텍스트로 돌려줍니다.

지금 RAM에 올라와 있는 부분, 즉 resident set이며 작업 관리자가 프로세스 이름 옆에 보여주는 값입니다. 할당은 됐지만 페이지 아웃된 메모리는 세지 않습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '프로세스의 작업 집합입니다.' },
	{ os: 'macos', note: '`ps`가 `RSS` 항목에 출력하는 값과 같은 resident size입니다.' },
	{ os: 'linux', note: '`/proc/self/statm`의 resident set입니다. 다른 프로세스와 공유하는 메모리도 전부 세므로, 여러 프로세스의 값을 더하면 기기가 실제로 쓰는 양보다 커집니다.' },
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
console.log(getProcessMemoryUsage()); // Returns '52 MB'
```

:::

::: lang dart

```dart
print(getProcessMemoryUsage()); // Returns '52 MB'
```

:::

::: lang python

```python
print(getProcessMemoryUsage())  # Returns '20 MB'
```

:::
