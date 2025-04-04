# isUrl <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

지정된 데이터가 올바른 URL 형식일 경우 `true`를 반환합니다. withProtocol이 `true`이면, 프로토콜이 존재하지 않을 때 URL에 자동으로 추가됩니다. strict가 `true`이면, 쉼표(`.`)가 없는 URL은 `false`를 반환합니다.

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
