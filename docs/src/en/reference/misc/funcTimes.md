# funcTimes <Lang dart js />

Repeat iteratee n (times argument value) times. After the return result of each function is stored in the array in order, the final array is returned.

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
