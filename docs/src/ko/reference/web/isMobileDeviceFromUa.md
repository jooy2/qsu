# isMobileDeviceFromUa

User-Agent 문자열을 읽어 휴대폰에서 보낸 것이면 `true`를 반환합니다. 태블릿은 휴대폰이 아니므로 iPad나 Android 태블릿은 `false`이고, 이런 기기는 [isTabletDeviceFromUa](./isTabletDeviceFromUa)로 판별합니다.

휴대폰은 [detectmobilebrowsers.com](http://detectmobilebrowsers.com/)의 패턴으로 판별하며, 이 패턴은 iPhone, Android 휴대폰, Windows Phone, BlackBerry, Opera Mini와 예전 피처폰을 다룹니다. MDN이 권하는 대로 문자열 어딘가에 `Mobi`가 있어도 휴대폰으로 봅니다.

기기 판별 함수 세 개는 문자열을 같은 순서로 읽기 때문에, 한 문자열에 `true`를 반환하는 함수는 많아야 하나입니다. 기기를 밝히지 않는 문자열은 세 함수 모두 `false`입니다. `curl/8.0`, 대부분의 크롤러, 스마트 TV, 게임 콘솔, VR 헤드셋이 여기에 해당합니다. Googlebot Smartphone처럼 휴대폰인 척하는 크롤러는 문자열이 그렇게 말하므로 휴대폰으로 판별됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true, desc: '`User-Agent` 요청 헤더의 값입니다. 빈 문자열이면 `false`를 반환합니다.' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isMobileDeviceFromUa(
	'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
); // Returns true
isMobileDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
); // Returns true
isMobileDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
isMobileDeviceFromUa(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
```

:::

::: lang dart

```dart
isMobileDeviceFromUa(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'); // Returns true
isMobileDeviceFromUa(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'); // Returns true
isMobileDeviceFromUa(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns false
isMobileDeviceFromUa(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns false
```

:::

::: lang python

```python
isMobileDeviceFromUa(
	'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
)  # Returns True
isMobileDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
)  # Returns True
isMobileDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns False
isMobileDeviceFromUa(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns False
```

:::
