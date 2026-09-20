# getFreeDiskSize

<NodeRequired ko />

주어진 경로가 속한 파일 시스템에서 아직 쓸 수 있는 공간을 단위가 붙은 읽기 쉬운 텍스트로 돌려줍니다.

비어 있는 모든 바이트가 아니라 현재 사용자가 쓸 수 있는 공간입니다. 리눅스와 맥OS는 파일 시스템이 슈퍼유저용 블록을 따로 남겨 두는데 여기에는 세지 않으므로, 이 값과 [getDiskUsage](/ko/reference/os/getDiskUsage)를 더해도 디스크 전체가 되지 않습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '경로가 속한 볼륨입니다. 계정에 걸린 디스크 할당량을 반영하므로, 할당량이 있는 사용자는 볼륨이 아니라 할당량의 남은 용량을 보게 됩니다.' },
	{ os: 'macos', note: '경로가 속한 파일 시스템입니다. 마운트 지점은 그 지점이 놓인 쪽이 아니라 마운트된 파일 시스템을 보고합니다.' },
	{ os: 'linux', note: '경로가 속한 파일 시스템입니다. 여유 용량에는 슈퍼유저용으로 예약된 블록(보통 파일 시스템의 5%)이 빠지므로, 여유 용량과 사용량의 합이 전체와 맞지 않습니다. `df`도 같은 방식으로 보여 줍니다.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'path', type: 'string', desc: '측정할 파일 시스템 위의 경로입니다. 경로 자체가 아니라 그 경로가 속한 파일 시스템을 측정하므로 아무 경로나 됩니다. 기본값은 현재 작업 디렉터리입니다. 없는 경로를 주면 파일 시스템 에러가 그대로 발생합니다.' }
]" />

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getFreeDiskSize()); // Returns '106 GB'
```

:::

::: lang python

```python
print(getFreeDiskSize())  # Returns '106 GB'
```

:::
