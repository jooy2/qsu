# objFindInTree

객체의 데이터 세트에 있는 특정 데이터의 키가 특정 값에 해당하는 경우 객체를 반환합니다. 이 함수는 하나의 결과만 반환하므로, 모든 하위 항목을 포함하여 고유 ID를 검색하는 데 사용됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true },
	{ name: 'searchKey', type: 'string', required: true },
	{ name: 'searchValue', type: 'any', required: true },
	{ name: 'childrenKey', type: 'string', required: true }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
objFindInTree(
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
	'child' // childrenKey
); // Returns '{ id: 456, name: 'childItemA' }'
```

:::

::: lang dart

```dart
objFindInTree({
  'id': 123,
  'name': 'parent',
  'child': [
    {'id': 456, 'name': 'childItemA'},
    {'id': 789, 'name': 'childItemB'},
  ],
}, 'id', 789, 'child');
// Returns {id: 789, name: childItemB}
```

:::

::: lang python

```python
objFindInTree(
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
	'child'  # childrenKey
)  # Returns { 'id': 456, 'name': 'childItemA' }
```

:::
