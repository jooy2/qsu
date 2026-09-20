# getTimezone

<NodeRequired ko />

시스템 시간대의 IANA 이름을 돌려줍니다. `Asia/Seoul` 같은 값입니다.

날짜 라이브러리에 그대로 넘길 수 있는 이름입니다. 오프셋이 아니라 IANA 이름인 이유는, 오프셋만으로는 시계가 언제 바뀌는지 말할 수 없기 때문입니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '윈도우는 `Korea Standard Time`처럼 자체 이름을 씁니다. 런타임이 이를 IANA 이름으로 바꿔주므로 다른 플랫폼과 같은 값이 나옵니다.' },
	{ os: 'macos', note: '시스템 설정에서 지정한 시간대입니다.' },
	{ os: 'linux', note: '`TZ` 환경 변수가 있으면 그 값, 없으면 `/etc/localtime`이 가리키는 곳입니다.' },
	{ os: 'android', note: '런타임이 시스템 설정에서 알아낸 IANA 이름입니다.' },
	{ os: 'ios', support: 'no', note: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getTimezone()); // Returns 'Asia/Seoul'
```

:::
