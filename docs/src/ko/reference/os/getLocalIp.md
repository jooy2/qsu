# getLocalIp

<NodeRequired ko />

이 기기가 자기 네트워크에서 도달 가능한 IPv4 주소를 돌려줍니다. `192.168.0.14` 같은 값입니다.

기본 경로가 쓰는 주소이므로, 인터페이스가 여러 개인 기기는 먼저 설정된 쪽이 아니라 실제로 트래픽이 나가는 쪽을 돌려줍니다. 주소를 알아내려고 패킷을 보내지는 않습니다. UDP 소켓을 연결해 커널에 어느 경로를 쓸지 묻고 바로 닫습니다. 경로가 아예 없는 기기는 `127.0.0.1`을 돌려줍니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '기본 경로가 쓰는 주소입니다. VPN이 기본 경로를 차지하고 있으면 물리 어댑터 대신 VPN 쪽이 나옵니다.' },
	{ os: 'macos', note: '기본 경로가 쓰는 주소입니다. 와이파이가 활성 인터페이스면 와이파이 주소가, 이더넷으로 넘어가면 이더넷 주소가 나옵니다.' },
	{ os: 'linux', note: '기본 경로가 쓰는 주소입니다. 컨테이너 안에서는 호스트 주소가 아니라 컨테이너가 브리지에서 받은 주소가 나옵니다.' },
	{ os: 'android', note: '활성 인터페이스의 주소입니다. 와이파이가 꺼져 있으면 이동통신망 주소가 나옵니다.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.', dart: '활성 인터페이스의 주소입니다. 와이파이가 꺼져 있으면 이동통신망 주소가 나옵니다.', python: 'JavaScript와 Python 패키지는 iOS에서 동작하지 않습니다.' } }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getLocalIp()); // Returns '192.168.0.14'
```

:::

::: lang dart

```dart
print(await getLocalIp()); // Returns '192.168.0.14'
```

:::

::: lang python

```python
print(getLocalIp())  # Returns '192.168.0.14'
```

:::
