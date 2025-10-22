# funcTimes <Lang dart js />

반복 반복 n(횟수 인수 값)번 반복합니다. 각 함수의 반환 결과가 순서대로 배열에 저장된 후 최종 배열이 반환됩니다.

## Parameters

- `times::number`
- `iteratee::function`

## Returns

> any[]

## Examples

```javascript
function sayHi(str) {
	return `Hi${str || ''}`;
}

funcTimes(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
funcTimes(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```
