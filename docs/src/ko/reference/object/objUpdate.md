# objUpdate <Badge type="tip" text="JavaScript" />

지정된 객체에서 특정 키 이름에 해당하는 값을 변경합니다. `recursive` 옵션이 `true`인 경우, 하위 객체 항목도 검색합니다. 이 옵션은 부모 항목과 하위 항목 모두에서 발견된 동일한 키의 값을 변경합니다. `upsert` 옵션이 `true`인 경우, 키가 발견되지 않으면 최상위 항목에 새로운 속성으로 추가합니다.

## Parameters

- `obj::object`
- `searchKey::string`
- `value::any`
- `recursive::boolean`
- `upsert::boolean`

## Returns

> object|null

## Examples

```javascript
const result = objUpdate(
	{
		a: 1,
		b: {
			a: 1,
			b: 2,
			c: 3
		},
		c: 3
	},
	'c',
	5,
	true,
	false
);

console.log(result); // Returns { a: 1, b: { a: 1, b: 2, c: 5 }, c: 5 }
```
