# strToNumberHash <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

지정된 문자열을 숫자형 해시값으로 반환합니다. 반환값은 음수일 수도 있습니다.

## Parameters

- `str::string`

## Returns

> number

## Examples

```javascript
strToNumberHash('abc'); // Returns 96354
strToNumberHash('Hello'); // Returns 69609650
strToNumberHash('hello'); // Returns 99162322
```
