# getCpuUsage

<NodeRequired ko />

프로세서가 쉬지 않고 일한 시간의 비율을 `0`에서 `100` 사이의 백분율로 돌려줍니다.

한 순간의 사용률이라는 것은 없으므로 표본을 재서 구합니다. 프로세서 카운터를 읽고, 기다렸다가, 다시 읽습니다. 이 기다리는 시간이 `interval`이며, 길게 잡을수록 값이 안정됩니다. 호출한 프로세스가 아니라 모든 코어를 합한 값입니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '시스템 전체 프로세서 시간에서 구합니다. 커널 시간에 유휴 시간이 이미 포함돼 있습니다.' },
	{ os: 'macos', note: '커널의 틱 카운터를 모든 코어에 대해 합산해서 구합니다.' },
	{ os: 'linux', note: '`/proc/stat`에서 구합니다. I/O를 기다린 시간과 하이퍼바이저가 가져간 시간은 작업으로도 유휴로도 치지 않으므로, 바쁜 가상 머신이 호스트가 말하는 값보다 낮게 나올 수 있습니다.' },
	{ os: 'android', languages: 'dart', note: '리눅스와 같은 `/proc` 파일을 읽습니다.' },
	{ os: 'ios', languages: 'dart', note: '맥OS와 같은 시스템 호출로 답합니다.' }
]" />

## Parameters

<ParamsTable :rows="[
	{ name: 'interval', type: 'number', default: '100', named: true, desc: '표본을 재는 시간이며 단위는 밀리초입니다. `0`을 주면 잴 시간이 없으므로 `0`이 나옵니다.' },
	{ name: 'decimals', type: 'number', default: '1', named: true, desc: '남길 소수점 자릿수입니다. `0`이면 정수로 돌려줍니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'Promise<number>', python: 'int | float' }" />

## Examples

::: lang js

```javascript
console.log(await getCpuUsage()); // Returns 17.8
console.log(await getCpuUsage(1000, 2)); // Returns 17.73
```

:::

::: lang dart

```dart
print(await getCpuUsage()); // Returns 17.8
print(await getCpuUsage(interval: 1000, decimals: 2)); // Returns 17.73
```

:::

::: lang python

```python
print(getCpuUsage())  # Returns 17.8
print(getCpuUsage(1000, 2))  # Returns 17.73
```

:::
