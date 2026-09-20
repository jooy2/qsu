# getMachineId

<NodeRequired ko />

현재 장치의 고유 UUID를 가져옵니다. 값을 가져오지 못하면 에러를 발생시킵니다. `Promise` 객체를 반환하므로, `await` 또는 `.then()`을 사용하여 작업이 완료될 때까지 기다렸다가 올바른 값을 얻으십시오.

UUID는 시스템을 재설치하거나 가상 머신의 환경이 변경될 때 변경될 수 있습니다. 일부 시스템에서는 시스템 관리자가 이 값을 수정할 수도 있습니다(그러나 시스템이 불안정해질 수 있으므로 거의 사용되지 않습니다).

이 방법은 시스템의 모든 사용자에게 동일한 값을 반환합니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`HKLM\\SOFTWARE\\Microsoft\\Cryptography` 아래의 `MachineGuid` 값입니다.' },
	{ os: 'macos', note: '`ioreg`로 읽은 `IOPlatformUUID` 속성입니다.' },
	{ os: 'linux', support: 'partial', note: '`/var/lib/dbus/machine-id` 또는 `/etc/machine-id`의 내용입니다. 둘 다 없으면 호스트 이름을 쓰는데, 이 값은 고유하지 않고 바뀔 수 있습니다.' },
	{ os: 'android', note: '안드로이드에는 `/etc/machine-id`가 없어 호출이 실패합니다.' },
	{ os: 'ios', support: 'no', note: 'iOS는 프로그램이 다른 프로그램을 실행하는 것을 허용하지 않아 이 함수는 동작하지 않습니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
console.log(await getMachineId()); // Returns 'a642d9e1-6063-4da7-8ea8-2298f989d01d'
```

:::

::: lang dart

```dart
print(await getMachineId()); // Returns 'a642d9e1-6063-4da7-8ea8-2298f989d01d'
```

:::

::: lang python

```python
print(getMachineId())  # Returns 'a642d9e1-6063-4da7-8ea8-2298f989d01d'
```

:::
