# split <Badge type="tip" text="JavaScript" />

지정된 문자를 기준으로 문자열을 분할하여 배열로 반환합니다. 기존의 split과는 달리, 여러 개의 매개변수(배열 또는 여러 개의 인수)로 제공된 값을 한 번에 분할합니다.

## Parameters

- `str::string`
- `splitter::string||string[]||...string`

## Returns

> string[]

## Examples

```javascript
split('hello% js world', '% '); // Returns ['hello', 'js world']
split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```
