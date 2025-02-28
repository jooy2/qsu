# objFindItemRecursiveByKey <Badge type="tip" text="JavaScript" />

Returns the object if the key of a specific piece of data in the object's dataset corresponds to a specific value. This function returns only one result, so it is used to search for unique IDs, including all of their children.

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
