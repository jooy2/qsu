# isUrl <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns `true` if the given data is in the correct URL format. If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist. If strict is `true`, URLs without commas (`.`) return `false`.

## Parameters

- `url::string`
- `withProtocol::boolean || false` <span class="named">Dart:Named</span>
- `strict::boolean || false` <span class="named">Dart:Named</span>

## Returns

> boolean

## Examples

```javascript
isUrl('google.com'); // Returns false
isUrl('google.com', true); // Returns true
isUrl('https://google.com'); // Returns true
```
