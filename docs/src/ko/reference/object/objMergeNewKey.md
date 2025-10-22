# objMergeNewKey <Lang js />

두 개의 객체 데이터를 하나의 객체로 병합합니다. 이 방법의 핵심은 두 객체를 비교하고 새로 추가된 키 데이터가 있다면 추가하는 것입니다.

값이 기존 키와 다르면 변경된 값으로 대체됩니다. 배열의 길이가 같고 배열의 데이터 유형이 객체인 경우, 두 객체의 동일한 배열 인덱스에서 객체 키를 다시 비교하여 새 키를 추가합니다.

일반 배열(배열 데이터가 객체가 아닌 경우)의 경우, 원래 값을 유지하지만, 세 번째 인수 `options`에 다음을 지정하면 배열 처리 방법을 사용자 지정할 수 있습니다.

```javascript
const obj1 = {};
const obj2 = {};
const options = {
	arrayAction: 'original' // option value: 'original' | 'replace' | 'append'
};

objMergeNewKey(obj1, obj2, options);
```

`arrayAction`이 지정되지 않으면, `original`이 기본 동작이 됩니다. 각 동작의 기능은 다음과 같습니다:

- `original`: 기존 값 사용
- `replace`: 새로운 값 사용
- `append`: 기존 값에 새로운 값 추가(중복 허용)

첫 번째 인수는 원래 값을 지정해야 하고, 두 번째 인수는 새로 추가된 키를 포함하는 객체 값을 지정해야 합니다.

## Parameters

- `obj::object`
- `obj2::object`
- `arrayAction::object?`: 'original' | 'replace' | 'append'

## Returns

> object|null

## Examples

```javascript
const result = objMergeNewKey(
	{
		a: 1,
		b: {
			a: 1
		},
		c: [1, 2]
	},
	{
		b: {
			b: 2
		},
		c: [3],
		d: 4
	}
);

console.log(result); // Returns { a: 1, b: { a: 1, b: 2 }, c: [1, 2], d: 4
```
