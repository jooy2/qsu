# isDesktopDeviceFromUa

User-Agent 문자열을 읽어 Windows, macOS, Linux, ChromeOS, BSD를 쓰는 데스크톱이나 노트북에서 보낸 것이면 `true`를 반환합니다.

이 운영체제 중 하나를 밝힌 문자열만 데스크톱으로 봅니다. 대부분의 크롤러와 HTTP 클라이언트는 운영체제를 밝히지 않으므로 `curl/8.0`과 Googlebot은 `false`입니다. 스마트 TV, 게임 콘솔, VR 헤드셋은 안에서 Linux나 Windows를 쓰고 문자열에도 그렇게 적지만 역시 `false`입니다.

iPadOS 13 이후의 Safari는 Mac과 같은 문자열을 보내므로 여기서 `true`입니다. 그 이유는 [isTabletDeviceFromUa](./isTabletDeviceFromUa)에 있습니다. 기기 판별 함수 세 개의 공통 동작은 [isMobileDeviceFromUa](./isMobileDeviceFromUa)에 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true, desc: '`User-Agent` 요청 헤더의 값입니다. 빈 문자열이면 `false`를 반환합니다.' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isDesktopDeviceFromUa(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns true
isDesktopDeviceFromUa(
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
); // Returns true
isDesktopDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
); // Returns false
isDesktopDeviceFromUa(
	'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) 76.0.3809.146/6.0 TV Safari/537.36'
); // Returns false
```

:::

::: lang dart

```dart
isDesktopDeviceFromUa(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns true
isDesktopDeviceFromUa(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'); // Returns true
isDesktopDeviceFromUa(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'); // Returns false
isDesktopDeviceFromUa(
    'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) 76.0.3809.146/6.0 TV Safari/537.36'); // Returns false
```

:::

::: lang python

```python
isDesktopDeviceFromUa(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns True
isDesktopDeviceFromUa(
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
)  # Returns True
isDesktopDeviceFromUa(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
)  # Returns False
isDesktopDeviceFromUa(
	'Mozilla/5.0 (SMART-TV; LINUX; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) 76.0.3809.146/6.0 TV Safari/537.36'
)  # Returns False
```

:::
