# getHomeDir

<NodeRequired ko />

현재 사용자의 홈 디렉터리를 돌려줍니다.

환경 변수가 우선이므로, `HOME`을 다른 곳으로 지정해 실행한 프로세스는 계정이 소유한 디렉터리가 아니라 그 지정된 디렉터리를 받습니다.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`C:\\Users\\Sam` 같은 `USERPROFILE` 값이며, 없으면 시스템이 계정에 대해 기록해 둔 경로를 씁니다.' },
	{ os: 'macos', note: '`/Users/sam` 같은 `HOME` 값이며, 없으면 계정 레코드의 경로를 씁니다.' },
	{ os: 'linux', note: '`/home/sam` 같은 `HOME` 값이며, 없으면 패스워드 데이터베이스의 경로를 씁니다.' },
	{ os: 'android', languages: 'dart', note: '`HOME` 값이며, 앱에서는 자기 샌드박스 안의 디렉터리입니다.' },
	{ os: 'ios', languages: 'dart', note: '`HOME` 값이며 앱의 샌드박스입니다. 사용자가 탐색하는 디렉터리가 아닙니다.' }
]" />

## Parameters

필수 매개 변수 없음

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getHomeDir()); // Returns '/Users/sam'
```

:::

::: lang dart

```dart
print(getHomeDir()); // Returns '/Users/sam'
```

:::

::: lang python

```python
print(getHomeDir())  # Returns '/Users/sam'
```

:::
