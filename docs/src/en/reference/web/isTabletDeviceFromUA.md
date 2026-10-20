# isTabletDeviceFromUA

Reads a User-Agent string and returns `true` if it comes from a tablet: an iPad, an Android tablet, a Kindle or Fire tablet, or a BlackBerry PlayBook.

An Android string is a tablet when nothing in it names a phone. Chrome and the stock browser leave `Mobile` out on a tablet, and Firefox writes `Tablet` where it would write `Mobile` on a phone.

Since iPadOS 13, Safari on an iPad sends the same string as Safari on a Mac unless the user asks for the mobile site, and no User-Agent check can tell the two apart. Such a string returns `false` here and `true` from [isDesktopDeviceFromUA](./isDesktopDeviceFromUA). In the browser itself, a Mac string together with `navigator.maxTouchPoints > 1` is the usual sign of an iPad.

[isMobileDeviceFromUA](./isMobileDeviceFromUA) describes what the three device functions have in common.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true, desc: 'The value of the `User-Agent` request header. An empty string returns `false`.' }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isTabletDeviceFromUA(
	'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'
); // Returns true
isTabletDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns true
isTabletDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
); // Returns false
isTabletDeviceFromUA(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
); // Returns false
```

:::

::: lang dart

```dart
isTabletDeviceFromUA(
    'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'); // Returns true
isTabletDeviceFromUA(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns true
isTabletDeviceFromUA(
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'); // Returns false
isTabletDeviceFromUA(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'); // Returns false
```

:::

::: lang python

```python
isTabletDeviceFromUA(
	'Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1'
)  # Returns True
isTabletDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns True
isTabletDeviceFromUA(
	'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'
)  # Returns False
isTabletDeviceFromUA(
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
)  # Returns False
```

:::
