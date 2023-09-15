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

## `_.debounce (void)`

When the given function is executed repeatedly, the function is called if it has not been called again within the specified timeout. This function is used when a small number of function calls are needed for repetitive input events.

For example, if you have a `func` variable written as `const func = debounce(() => console.log('hello'), 1000)` and you repeat the `func` function 100 times with a wait interval of 100ms, the function will only run once after 1000ms because the function was executed at 100ms intervals. However, if you increase the wait interval from 100ms to 1100ms or more and repeat it 100 times, the function will run all 100 times intended.

- `func::function`
- `timeout::number`

```html
<!doctype html>
<html lang="en">
	<head>
		<title>test</title>
	</head>
	<body>
		<input type="text" onkeyup="handleKeyUp()" />
	</body>
</html>
<script>
	import _ from 'qsu';

	const keyUpDebounce = _.debounce(() => {
		console.log('handleKeyUp called.');
	}, 100);

	function handleKeyUp() {
		keyUpDebounce();
	}
</script>
```

## `_.getPlatform (string)`

Returns the operating system of the currently running process as a human-friendly string.

```javascript
_.getPlatform(); // Returns 'Windows'
```
