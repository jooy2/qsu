# getUsername

<NodeRequired ko />

프로세스를 실행 중인 계정의 이름을 돌려줍니다.

시스템이 그 계정에 대해 기록해 둔 이름이며, 사용자가 따로 정한 표시 이름도 환경 변수 값도 아닙니다. 계정 이름을 전혀 알아낼 수 없으면 `Unknown`을 돌려줍니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '도메인을 뺀 계정 이름입니다.' },
	{ os: 'macos', note: '계정 레코드의 짧은 이름입니다. 로그인 화면에 보이는 전체 이름이 아니라 `sam` 같은 쪽입니다.' },
	{ os: 'linux', note: '패스워드 데이터베이스의 이름입니다. 항목이 없는 숫자 ID로 도는 컨테이너에서는 환경 변수 `USER`를 보고, 그것도 없으면 `Unknown`이 됩니다.' },
	{ os: 'android', languages: 'dart', note: '앱 프로세스를 실행하는 사용자이며, 안드로이드는 사람이 아니라 앱 이름을 씁니다.' },
	{ os: 'ios', languages: 'dart', note: '`mobile`이며, 기기의 모든 앱이 이 사용자로 실행됩니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getUsername()); // Returns 'sam'
```

:::

::: lang dart

```dart
print(getUsername()); // Returns 'sam'
```

:::

::: lang python

```python
print(getUsername())  # Returns 'sam'
```

:::
