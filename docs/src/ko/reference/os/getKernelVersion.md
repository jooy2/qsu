# getKernelVersion

<NodeRequired ko />

운영 체제 커널의 버전을 돌려줍니다.

사용자가 부르는 버전이 아닙니다. 맥OS 26은 다윈 버전인 `25.6.0`을, 윈도우 11은 NT 버전인 `10.0.26100`을 돌려줍니다. 커널을 구분하는 용도로 쓰고, 사람에게 보여줄 버전으로는 쓰지 마십시오.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`10.0.26100` 같은 NT 버전입니다. 윈도우 10과 11이 모두 `10.0`이므로, 둘을 가르는 것은 뒤의 빌드 번호입니다.' },
	{ os: 'macos', note: '`25.6.0` 같은 다윈 커널 버전입니다. 맥OS 버전이 아니며, 맥OS 쪽 숫자가 몇 단계 더 큽니다.' },
	{ os: 'linux', note: '`6.8.0-45-generic` 같은 커널 릴리스입니다. 대부분의 배포판이 여기에 자기 접미사를 붙입니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getKernelVersion()); // Returns '25.6.0'
```

:::

::: lang python

```python
print(getKernelVersion())  # Returns '25.6.0'
```

:::
