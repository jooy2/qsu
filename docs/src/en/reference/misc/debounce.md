# debounce <Lang dart js python />

When the given function is executed repeatedly, the function is called if it has not been called again within the specified timeout. This function is used when a small number of function calls are needed for repetitive input events.

For example, if you have a `func` variable written as `const func = debounce(() => console.log('hello'), 1000)` and you repeat the `func` function 100 times with a wait interval of 100ms, the function will only run once after 1000ms because the function was executed at 100ms intervals. However, if you increase the wait interval from 100ms to 1100ms or more and repeat it 100 times, the function will run all 100 times intended.

## Parameters

- `func::function`
- `timeout::number`

## Returns

No return values

## Examples

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>test</title>
	</head>
	<body>
		<input type="text" onkeyup="handleKeyUp()" />
	</body>
</html>
<script>
	import { debounce } from 'qsu';

	const keyUpDebounce = debounce(() => {
		console.log('handleKeyUp called.');
	}, 100);

	function handleKeyUp() {
		keyUpDebounce();
	}
</script>
```

```python [Python]
from qsu.misc import debounce

# debounce returns a wrapper. Repeated calls within the timeout window
# (in milliseconds) reset the timer, so func only runs once the calls stop.
def on_key_up():
	print('handleKeyUp called.')

key_up_debounce = debounce(on_key_up, 100)

key_up_debounce()  # only the final call within the 100ms window fires
```
