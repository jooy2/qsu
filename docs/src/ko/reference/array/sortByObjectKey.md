# sortByObjectKey <Badge type="tip" text="JavaScript" />

여러 개체가 포함된 배열의 특정 키 값을 기준으로 배열 값을 정렬합니다. 개체 내의 요소의 순서나 값에는 영향을 미치지 않습니다.

`numerically` 옵션이 `true`인 경우, 문자열로 구성된 배열을 정렬할 때, 이름이 아니라 문자열에 포함된 숫자를 기준으로 먼저 정렬합니다.

## Parameters

- `array::any[]`
- `key::string`
- `descending::boolean`
- `numerically::boolean`

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
const obj = [
	{
		aa: 1,
		bb: 'aaa',
		cc: 'hi1'
	},
	{
		aa: 4,
		bb: 'ccc',
		cc: 'hi10'
	},
	{
		aa: 2,
		bb: 'ddd',
		cc: 'hi2'
	},
	{
		aa: 3,
		bb: 'bbb',
		cc: 'hi11'
	}
];

sortByObjectKey(obj, 'aa');

/*
[
	{
		aa: 1,
		bb: 'aaa',
		cc: 'hi1'
	},
	{
		aa: 2,
		bb: 'ddd',
		cc: 'hi2'
	},
	{
		aa: 3,
		bb: 'bbb',
		cc: 'hi11'
	},
	{
		aa: 4,
		bb: 'ccc',
		cc: 'hi10'
	}
]
*/
```

:::
