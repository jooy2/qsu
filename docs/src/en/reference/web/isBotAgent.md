# isBotAgent <Lang js dart />

Analyze the user agent value to determine if it's a bot for a search engine. Returns `true` if it's a bot.

## Parameters

- `userAgent::string`

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

```dart [Dart]
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

:::
