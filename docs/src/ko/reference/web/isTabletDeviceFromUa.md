# isTabletDeviceFromUa

User-Agent 문자열을 읽어 태블릿에서 보낸 것이면 `true`를 반환합니다. iPad, Android 태블릿, Kindle과 Fire 태블릿, BlackBerry PlayBook이 태블릿입니다.

Android 문자열은 휴대폰을 가리키는 내용이 없을 때 태블릿으로 봅니다. Chrome과 기본 브라우저는 태블릿에서 `Mobile`을 빼고 보내며, Firefox는 휴대폰에서 `Mobile`을 쓰는 자리에 `Tablet`을 씁니다.

iPadOS 13부터 iPad의 Safari는 사용자가 모바일 사이트를 요청하지 않는 한 Mac의 Safari와 같은 문자열을 보냅니다. User-Agent만으로는 둘을 구별할 수 없으므로, 이런 문자열은 여기서 `false`이고 [isDesktopDeviceFromUa](./isDesktopDeviceFromUa)에서 `true`입니다. 브라우저 안에서는 Mac 문자열이면서 `navigator.maxTouchPoints > 1`이면 iPad로 보는 방법이 흔히 쓰입니다.

기기 판별 함수 세 개의 공통 동작은 [isMobileDeviceFromUa](./isMobileDeviceFromUa)에 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true, desc: '`User-Agent` 요청 헤더의 값입니다. 빈 문자열이면 `false`를 반환합니다.' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isTabletDeviceFromUa(
	'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'
); // Returns true
isTabletDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns true
isTabletDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
); // Returns false
isTabletDeviceFromUa(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
```

:::

::: lang dart

```dart
isTabletDeviceFromUa(
    'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'); // Returns true
isTabletDeviceFromUa(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns true
isTabletDeviceFromUa(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'); // Returns false
isTabletDeviceFromUa(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns false
```

:::

::: lang python

```python
isTabletDeviceFromUa(
	'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'
)  # Returns True
isTabletDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns True
isTabletDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
)  # Returns False
isTabletDeviceFromUa(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns False
```

:::
