# objDeleteKeyByValue <Lang js dart />

지정된 값과 동일한 키를 객체 데이터에서 삭제합니다. `recursive` 옵션이 `true`인 경우, 하위 항목에서 동일한 값에 해당하는 모든 키도 삭제합니다.

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
