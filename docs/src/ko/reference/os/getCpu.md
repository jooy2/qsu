# getCpu

<NodeRequired ko />

이 함수는 현재 시스템에서 사용하는 CPU 이름을 반환합니다. OS에 따라 이름이 올바르지 않거나 가져오지 못하는 경우가 있습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '레지스트리의 `ProcessorNameString` 값입니다.' },
	{ os: 'macos', note: '`machdep.cpu.brand_string` 시스템 컨트롤이 보고하는 이름입니다.' },
	{ os: 'linux', support: 'partial', note: { js: '`/proc/cpuinfo`의 `model name`입니다. `arm64` 커널은 이 항목 대신 숫자 `CPU part`를 쓰며, 이는 `Cortex-A72` 같은 코어 이름으로 변환됩니다.', python: '`/proc/cpuinfo`의 `model name`입니다. `arm64` 커널에는 이 항목이 없어 보드 이름을 쓰고, 그것도 없으면 아키텍처 이름을 씁니다.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getCpu()); // e.g. 'Apple M1'...
```

:::

::: lang python

```python
print(getCpu())  # e.g. 'Apple M1'...
```

:::
