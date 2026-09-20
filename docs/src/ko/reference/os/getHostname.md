# getHostname

<NodeRequired ko />

현재 장치의 호스트 이름을 가져옵니다. 이는 주로 데스크톱에서 자동 설정 되었거나 사용자가 변경한 시스템의 이름입니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '시스템 속성에서 설정한 이름인 `COMPUTERNAME` 값입니다.' },
	{ os: 'macos', note: '시스템 설정에서 지정한 이름이며 커널 호스트 이름과 다릅니다. `sams-macbook.local`이 아니라 `Sam\'s MacBook` 쪽입니다. 이 이름을 읽지 못하면 커널 호스트 이름을 씁니다.' },
	{ os: 'linux', note: '`/etc/hostname`의 고정 호스트 이름이며, 없으면 커널 호스트 이름을 씁니다. 명령을 실행하지 않으므로 systemd가 없어도 됩니다.' },
	{ os: 'android', note: '커널 호스트 이름이며, 휴대폰에서는 보통 `localhost`입니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: '커널 호스트 이름입니다. 사용자가 기기에 붙인 이름은 사용자 동의 없이 읽을 수 없습니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getHostname()); // e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::

::: lang dart

```dart
print(await getHostname()); // e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::

::: lang python

```python
print(getHostname())  # e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::
