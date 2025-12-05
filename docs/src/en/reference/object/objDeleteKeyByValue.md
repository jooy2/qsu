# objDeleteKeyByValue <Lang js dart />

Deletes keys equal to the given value from the object data. If the `recursive` option is `true`, also deletes all keys corresponding to the same value in the child items.

## Parameters

- `obj::object`
- `searchValue::string|number|null|undefined`
- `recursive::boolean` <DartNamed />

## Returns

> object|null

## Examples

::: code-group

```javascript [JavaScript]
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

```dart [Dart]
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
