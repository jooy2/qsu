# getEndianness

<NodeRequired ko />

프로세서의 바이트 순서를 돌려줍니다. 리틀 엔디언이면 `LE`, 빅 엔디언이면 `BE`입니다.

바이트 순서를 기록하지 않는 바이너리 형식을 읽거나 쓸 때 필요합니다. 요즘 데스크톱이 쓰는 아키텍처는 모두 리틀 엔디언이라, 데스크톱만 대상으로 하는 프로그램은 늘 `LE`를 받습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '윈도우가 도는 모든 아키텍처에서 `LE`입니다.' },
	{ os: 'macos', note: '맥OS가 도는 모든 아키텍처에서 `LE`입니다.' },
	{ os: 'linux', note: 'x86과 ARM에서는 `LE`입니다. `s390x`처럼 빅 엔디언으로 빌드된 환경에서는 `BE`가 나옵니다.' },
	{ os: 'android', note: '안드로이드가 도는 모든 기기에서 `LE`입니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: 'iOS가 도는 모든 기기에서 `LE`입니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="'BE' | 'LE'" />

## Examples

::: lang js

```javascript
console.log(getEndianness()); // Returns 'LE'
```

:::

::: lang dart

```dart
print(getEndianness()); // Returns 'LE'
```

:::

::: lang python

```python
print(getEndianness())  # Returns 'LE'
```

:::
