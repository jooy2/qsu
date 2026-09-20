# getMacAddress

<NodeRequired ko />

루프백이 아닌 첫 번째 네트워크 인터페이스의 하드웨어 주소를 돌려줍니다. `9c:76:0e:4a:c0:e3` 같은 값입니다.

설정은 돼 있지만 연결된 것이 없는 인터페이스, 그리고 인터페이스가 아예 없는 기기는 모두 0으로 된 주소를 돌려줍니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '윈도우가 나열하는 순서에서 루프백이 아닌 첫 번째 어댑터입니다.' },
	{ os: 'macos', support: 'partial', note: '인터페이스에 현재 할당된 주소이며, 맥OS는 와이파이에 기본적으로 임의 주소를 씁니다. 네트워크가 바뀌면 값도 바뀌고, 기기에 적힌 주소와도 다릅니다.' },
	{ os: 'linux', note: '루프백이 아닌 첫 번째 인터페이스이며, 보통 기본 경로를 쓰는 인터페이스입니다.' },
	{ os: 'android', note: '안드로이드는 하드웨어 주소가 아니라 임의로 만든 주소를 보고합니다.' },
	{ os: 'ios', support: 'no', note: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getMacAddress()); // Returns '9c:76:0e:4a:c0:e3'
```

:::
