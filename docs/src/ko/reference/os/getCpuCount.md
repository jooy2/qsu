# getCpuCount

<NodeRequired ko />

이 프로세스가 쓸 수 있는 프로세서 코어 수를 돌려줍니다.

기기에 달린 코어 수와 늘 같지는 않습니다. CPU 친화성 마스크가 이 값을 줄이므로, 16코어 기기에서 2개 코어에 고정된 프로세스는 `2`를 받습니다. 워커 풀 크기를 정할 때 봐야 할 값이 이쪽입니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '프로세스 친화성 마스크에 포함된 코어 수입니다.' },
	{ os: 'macos', note: '하이퍼스레딩으로 늘어난 것까지 포함한 논리 코어 전체입니다. 맥OS에는 이를 줄일 프로세스별 친화성 설정이 없습니다.' },
	{ os: 'linux', note: '`taskset`이 정하는 친화성 마스크에 포함된 코어 수입니다. 마스크가 아니라 CPU 점유율로 제한된 컨테이너에서는 호스트의 코어 전체가 그대로 보입니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
console.log(getCpuCount()); // Returns 10
```

:::

::: lang python

```python
print(getCpuCount())  # Returns 10
```

:::
