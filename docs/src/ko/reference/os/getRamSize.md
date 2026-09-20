# getRamSize

<NodeRequired ko />

현재 장치의 전체 RAM 크기를 가져옵니다. 단위가 포함된 읽기 쉬운 텍스트로 반환됩니다. 소수점은 올림됩니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`GlobalMemoryStatusEx`가 보고하는 설치된 물리 메모리입니다.' },
	{ os: 'macos', note: '설치된 물리 메모리입니다.' },
	{ os: 'linux', note: '커널이 관리하는 물리 메모리입니다. 펌웨어와 커널이 일부를 예약하므로 실제 설치량보다 조금 적습니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getRamSize()); // Returns '8 GB'
```

:::

::: lang python

```python
print(getRamSize())  # Returns '8 GB'
```

:::
