# objFindItemRecursiveByKey <Badge type="tip" text="JavaScript" />

객체의 데이터 세트에 있는 특정 데이터의 키가 특정 값에 해당하는 경우 객체를 반환합니다. 이 함수는 하나의 결과만 반환하므로, 모든 하위 항목을 포함하여 고유 ID를 검색하는 데 사용됩니다.

## Parameters

- `obj::object`
- `searchKey::string`
- `searchValue::any`
- `childKey::string`

## Returns

> object|null

## Examples

```javascript
objFindItemRecursiveByKey(
	{
		id: 123,
		name: 'parent',
		child: [
			{
				id: 456,
				name: 'childItemA'
			},
			{
				id: 789,
				name: 'childItemB'
			}
		]
	}, // obj
	'id', // searchKey
	456, // searchValue
	'child' // childKey
); // Returns '{ id: 456, name: 'childItemA' }'
```
