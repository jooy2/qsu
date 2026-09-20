# getSid

<NodeRequired ko />

장치의 현재 사용자에 대한 보안 식별자(SID) 값을 가져옵니다. 값을 가져오지 못하면 에러를 발생시킵니다.

맥OS가 돌려주는 SID는 디렉터리 서비스를 위해 만들어진 값입니다. 이 값이 필요한 게 아니라면 [getMachineId](/ko/reference/os/getMachineId)로 기기를 식별하십시오.

이 값은 사용자가 변경할 수 있습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '홈 디렉터리를 소유한 프로필의 SID입니다.' },
	{ os: 'macos', support: 'partial', note: '디렉터리 서비스가 계정에 부여한 SID입니다. 윈도우의 SID가 아니며 이 기기 밖에서는 의미가 없습니다.' },
	{ os: 'linux', support: 'no', note: '리눅스에는 SID가 없습니다. 호출하면 에러가 발생합니다.' },
	{ os: 'android', languages: 'dart', support: 'no', note: '안드로이드에는 SID가 없습니다. 호출하면 에러가 발생합니다.' },
	{ os: 'ios', languages: 'dart', support: 'no', note: 'iOS에는 SID가 없습니다. 호출하면 에러가 발생합니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getSid()); // Returns 'S-1-5-21-406418252-5582013529-1321253100-2001'
```

:::

::: lang dart

```dart
print(await getSid()); // Returns 'S-1-5-21-406418252-5582013529-1321253100-2001'
```

:::

::: lang python

```python
print(getSid())  # Returns 'S-1-5-21-406418252-5582013529-1321253100-2001'
```

:::
