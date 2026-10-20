# isMobileDeviceFromUA

Reads a User-Agent string and returns `true` if it comes from a phone. A tablet is not a phone, so an iPad or an Android tablet returns `false`; [isTabletDeviceFromUA](./isTabletDeviceFromUA) answers for those.

A phone is recognized by the patterns of [detectmobilebrowsers.com](http://detectmobilebrowsers.com/), which cover the iPhone, Android phones, Windows Phone, BlackBerry, Opera Mini and older feature phones, and by `Mobi` anywhere in the string, which is what MDN recommends looking for.

The three device functions read a string in the same order, so at most one of them returns `true` for it. A string that names no device returns `false` from all three: `curl/8.0`, most crawlers, smart TVs, game consoles and VR headsets. A crawler that presents itself as a phone, such as Googlebot Smartphone, is reported as a phone, because the string says it is one.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true, desc: 'The value of the `User-Agent` request header. An empty string returns `false`.' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isMobileDeviceFromUA(
	'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
); // Returns true
isMobileDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
); // Returns true
isMobileDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
isMobileDeviceFromUA(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
```

:::

::: lang dart

```dart
isMobileDeviceFromUA(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'); // Returns true
isMobileDeviceFromUA(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'); // Returns true
isMobileDeviceFromUA(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns false
isMobileDeviceFromUA(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns false
```

:::

::: lang python

```python
isMobileDeviceFromUA(
	'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
)  # Returns True
isMobileDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
)  # Returns True
isMobileDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns False
isMobileDeviceFromUA(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns False
```

:::
