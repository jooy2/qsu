# getOsName

<NodeRequired ko />

운영 체제 이름을 사람이 부르는 대로 돌려줍니다. `macOS 26.6.2`, `Windows 11`, `Ubuntu 24.04.2 LTS` 같은 값입니다.

화면에 보여줄 값은 이쪽입니다. [getKernelVersion](/ko/reference/os/getKernelVersion)은 플랫폼마다 다른 커널 버전을 돌려주고, [getPlatform](/ko/reference/os/getPlatform)은 코드에서 비교할 이름을 돌려줍니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '빌드 번호로 판단합니다. 빌드 22000부터는 `Windows 11`, 그 아래는 `Windows 10`입니다. 레지스트리는 윈도우 11도 `Windows 10`이라고 적어두므로 쓰지 않습니다. 에디션은 포함하지 않습니다.' },
	{ os: 'macos', note: '시스템 버전 파일에서 읽은, 애플이 내세우는 제품 버전입니다. `macOS 26.6.2` 같은 값이며 다윈 버전은 이보다 몇 단계 낮습니다.' },
	{ os: 'linux', note: '`/etc/os-release`의 `PRETTY_NAME`이며, 배포판이 스스로 붙인 이름입니다. 이 파일이 없는 시스템은 `Linux`를 돌려줍니다.' },
	{ os: 'android', note: '빌드에 `os-release`가 있으면 `PRETTY_NAME`, 없으면 `Android`입니다. 사용자가 부르는 안드로이드 버전은 아닙니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: '`iOS 18.5` 같은 iOS 버전입니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getOsName()); // Returns 'macOS 26.6.2'
```

:::

::: lang dart

```dart
print(await getOsName()); // Returns 'macOS 26.6.2'
```

:::

::: lang python

```python
print(getOsName())  # Returns 'macOS 26.6.2'
```

:::
