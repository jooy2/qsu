# getDiskSize

<NodeRequired ko />

주어진 경로가 속한 파일 시스템의 전체 크기를 단위가 붙은 읽기 쉬운 텍스트로 돌려줍니다. 소수점은 [getRamSize](/ko/reference/os/getRamSize)와 같은 방식으로 올림합니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '경로가 속한 볼륨입니다. 계정에 걸린 디스크 할당량을 반영하므로, 할당량이 있는 사용자는 볼륨이 아니라 할당량의 남은 용량을 보게 됩니다.' },
	{ os: 'macos', note: '경로가 속한 파일 시스템입니다. 마운트 지점은 그 지점이 놓인 쪽이 아니라 마운트된 파일 시스템을 보고합니다.' },
	{ os: 'linux', note: '경로가 속한 파일 시스템입니다. 여유 용량에는 슈퍼유저용으로 예약된 블록(보통 파일 시스템의 5%)이 빠지므로, 여유 용량과 사용량의 합이 전체와 맞지 않습니다. `df`도 같은 방식으로 보여 줍니다.' },
	{ os: 'android', note: '경로가 속한 파일 시스템이며, 앱에서는 자기 저장 공간이 놓인 쪽입니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: '애플은 디스크 용량 API를 사유 선언 대상으로 분류하므로, 이 함수를 포함한 앱은 privacy manifest에 사유를 적어야 합니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'path', type: 'string', named: true, desc: '측정할 파일 시스템 위의 경로입니다. 경로 자체가 아니라 그 경로가 속한 파일 시스템을 측정하므로 아무 경로나 됩니다. 기본값은 현재 작업 디렉터리입니다. 없는 경로를 주면 파일 시스템 에러가 그대로 발생합니다.' }
]" />

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getDiskSize()); // Returns '927 GB'
console.log(await getDiskSize('/Users')); // Returns '927 GB'
```

:::

::: lang dart

```dart
print(await getDiskSize()); // Returns '927 GB'
print(await getDiskSize(path: '/Users')); // Returns '927 GB'
```

:::

::: lang python

```python
print(getDiskSize())  # Returns '927 GB'
print(getDiskSize('/Users'))  # Returns '927 GB'
```

:::
