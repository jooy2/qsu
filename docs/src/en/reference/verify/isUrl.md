# isUrl <Lang dart js />

Returns `true` if the given data is in the correct URL format. If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist. If strict is `true`, URLs without commas (`.`) return `false`.

## Parameters

- `url::string`
- `withProtocol::boolean || false` <span class="named">Dart:Named</span>
- `strict::boolean || false` <span class="named">Dart:Named</span>

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isUrl('google.com'); // Returns false
isUrl('google.com', true); // Returns true
isUrl('https://google.com'); // Returns true
```

```dart [Dart]
isUrl('google.com'); // Returns false
isUrl('google.com', withProtocol: true); // Returns true
isUrl('https://google.com'); // Returns true
```

:::
