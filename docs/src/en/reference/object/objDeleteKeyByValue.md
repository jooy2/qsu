# objDeleteKeyByValue <Lang js dart python />

Deletes keys equal to the given value from the object data. If the `recursive` option is `true`, also deletes all keys corresponding to the same value in the child items.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true },
	{ name: 'searchValue', type: 'string | number | null' },
	{ name: 'recursive', type: 'boolean', named: true, default: 'false' }
]" />

## Returns

<ReturnType type="object | null" />

## Examples

::: lang js

```javascript
const result = objDeleteKeyByValue(
	{
		a: 1,
		b: 2,
		c: {
			aa: 2,
			bb: {
				aaa: 1,
				bbb: 2
			}
		},
		d: {
			aa: 2
		}
	},
	2,
	true
);

console.log(result); // Returns { a: 1, c: { bb: { aaa: 1 } }, d: {} }
```

:::

::: lang dart

```dart
print(objDeleteKeyByValue(
    {
      'a': 1,
      'b': 2,
      'c': {
        'aa': 2,
        'bb': {
          'aaa': 1,
          'bbb': 2
        }
      },
      'd': {
        'aa': 2
      }
    },
    2,
    recursive: true
));
// Returns { 'a': 1, 'c': { 'bb': { 'aaa': 1 } }, 'd': {} }
```

:::

::: lang python

```python
result = objDeleteKeyByValue(
	{
		'a': 1,
		'b': 2,
		'c': {
			'aa': 2,
			'bb': {
				'aaa': 1,
				'bbb': 2
			}
		},
		'd': {
			'aa': 2
		}
	},
	2,
	True
)

print(result)  # Returns { 'a': 1, 'c': { 'bb': { 'aaa': 1 } }, 'd': {} }
```

:::
