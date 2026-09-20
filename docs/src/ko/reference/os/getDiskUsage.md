# getDiskUsage

<NodeRequired ko />

파일 시스템의 사용 비율을 `0`에서 `100` 사이의 백분율로 돌려줍니다.

슈퍼유저용으로 남겨 둔 블록까지 포함해 비어 있지 않은 블록을 모두 세므로, [getFreeDiskSize](/ko/reference/os/getFreeDiskSize)에서 짐작한 값보다 조금 높습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '경로가 속한 볼륨입니다. 계정에 걸린 디스크 할당량을 반영하므로, 할당량이 있는 사용자는 볼륨이 아니라 할당량의 남은 용량을 보게 됩니다.' },
	{ os: 'macos', note: '경로가 속한 파일 시스템입니다. 마운트 지점은 그 지점이 놓인 쪽이 아니라 마운트된 파일 시스템을 보고합니다.' },
	{ os: 'linux', note: '경로가 속한 파일 시스템입니다. 여유 용량에는 슈퍼유저용으로 예약된 블록(보통 파일 시스템의 5%)이 빠지므로, 여유 용량과 사용량의 합이 전체와 맞지 않습니다. `df`도 같은 방식으로 보여 줍니다.' },
	{ os: 'android', languages: 'dart', note: '경로가 속한 파일 시스템이며, 앱에서는 자기 저장 공간이 놓인 쪽입니다.' },
	{ os: 'ios', languages: 'dart', note: '애플은 디스크 용량 API를 사유 선언 대상으로 분류하므로, 이 함수를 포함한 앱은 privacy manifest에 사유를 적어야 합니다.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'path', type: 'string', named: true, desc: '측정할 파일 시스템 위의 경로입니다. 경로 자체가 아니라 그 경로가 속한 파일 시스템을 측정하므로 아무 경로나 됩니다. 기본값은 현재 작업 디렉터리입니다. 없는 경로를 주면 파일 시스템 에러가 그대로 발생합니다.' },
	{ name: 'decimals', type: 'number', default: '1', named: true, desc: '남길 소수점 자릿수입니다. `0`이면 정수로 돌려줍니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'Promise<number>', python: 'int | float' }" />

## Examples

::: lang js

```javascript
console.log(await getDiskUsage()); // Returns 88.6
console.log(await getDiskUsage('/', 0)); // Returns 89
```

:::

::: lang dart

```dart
print(await getDiskUsage()); // Returns 88.6
print(await getDiskUsage(path: '/', decimals: 0)); // Returns 89
```

:::

::: lang python

```python
print(getDiskUsage())  # Returns 88.6
print(getDiskUsage('/', 0))  # Returns 89
```

:::
