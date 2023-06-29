# Methods: Misc

## `_.sleep (Promise:boolean)`

Sleep function using Promise.

- `milliseconds::number`

```javascript
await _.sleep(1000); // 1s

_.sleep(5000).then(() => {
	// continue
});
```

## `_.funcTimes (any[])`

Repeat iteratee n (times argument value) times. After the return result of each function is stored in the array in order, the final array is returned.

- `times::number`
- `iteratee::function`

```javascript
function sayHi(str) {
	return `Hi${str || ''}`;
}

_.funcTimes(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
_.funcTimes(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

## `_.getPlatform (string)`

Returns the operating system of the currently running process as a human-friendly string.

```javascript
_.getPlatform(); // Returns 'Windows'
```
