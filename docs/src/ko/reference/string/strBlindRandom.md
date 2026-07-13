# strBlindRandom <Lang js python />

임의의 위치에 있는 문자열을 지정된 문자 수(기본값 1)로 대체합니다(기본값 \*).

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'blindLength', type: 'number', required: true },
	{ name: 'blindStr', type: 'string', default: `'*'` }
]" />

## Returns

> string

## Examples

```javascript
strBlindRandom('hello', 2, '#'); // Returns '#el#o'
```
