# getArch

<NodeRequired ko />

실행 중인 프로그램이 빌드된 프로세서 아키텍처를 돌려줍니다. `x64`나 `arm64` 같은 값입니다.

값은 `arm`, `arm64`, `ia32`, `loong64`, `mips`, `mipsel`, `ppc`, `ppc64`, `riscv64`, `s390`, `s390x`, `x64` 중 하나입니다. `aarch64`나 `AMD64`처럼 시스템이 자기 방식으로 부르는 이름은 이 목록으로 바꿔서 돌려주므로, 두 패키지가 같은 기기에 같은 값을 냅니다.

기기가 아니라 프로그램의 아키텍처입니다. 64비트 기기에서 32비트 빌드를 실행하면 `ia32`가 나옵니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`AMD64`는 `x64`로, `ARM64`는 `arm64`로 보고합니다. 64비트 기기라도 32비트 프로그램은 `ia32`가 나옵니다.' },
	{ os: 'macos', note: '인텔 맥은 `x64`, 애플 실리콘은 `arm64`입니다. 로제타로 실행 중인 프로그램은 빌드된 대로 `x64`가 나옵니다.' },
	{ os: 'linux', note: '`x86_64`는 `x64`로, `aarch64`는 `arm64`로, `armv7l`은 `arm`으로 보고합니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getArch()); // Returns 'arm64'
```

:::

::: lang python

```python
print(getArch())  # Returns 'arm64'
```

:::
