# objFindItemRecursiveByKey <Lang js python />

객체의 데이터 세트에 있는 특정 데이터의 키가 특정 값에 해당하는 경우 객체를 반환합니다. 이 함수는 하나의 결과만 반환하므로, 모든 하위 항목을 포함하여 고유 ID를 검색하는 데 사용됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true },
	{ name: 'searchKey', type: 'string', required: true },
	{ name: 'searchValue', type: 'any', required: true },
	{ name: 'childKey', type: 'string', required: true }
]" />

## Returns

> object|null

## Examples

::: code-group

```javascript [JavaScript]
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

```python [Python]
objFindItemRecursiveByKey(
	{
		'id': 123,
		'name': 'parent',
		'child': [
			{
				'id': 456,
				'name': 'childItemA'
			},
			{
				'id': 789,
				'name': 'childItemB'
			}
		]
	},  # obj
	'id',  # searchKey
	456,  # searchValue
	'child'  # childKey
)  # Returns { 'id': 456, 'name': 'childItemA' }
```

:::
