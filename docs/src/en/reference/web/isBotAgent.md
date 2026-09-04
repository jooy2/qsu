# isBotAgent <Lang js dart python />

Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

:::

::: lang dart

```dart
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

:::

::: lang python

```python
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')  # Returns True
```

:::
