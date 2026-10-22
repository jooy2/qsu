# isDesktopDeviceFromUa

Reads a User-Agent string and returns `true` if it comes from a desktop or laptop computer running Windows, macOS, Linux, ChromeOS or a BSD.

Only a string that names one of those systems counts. Most crawlers and HTTP clients name none, so `curl/8.0` and Googlebot return `false`. Smart TVs, game consoles and VR headsets return `false` too, even though many of them run Linux or Windows underneath and say so.

Safari on iPadOS 13 and later sends the same string as a Mac, so it returns `true` here; [isTabletDeviceFromUa](./isTabletDeviceFromUa) explains why. [isMobileDeviceFromUa](./isMobileDeviceFromUa) describes what the three device functions have in common.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true, desc: 'The value of the `User-Agent` request header. An empty string returns `false`.' }
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
