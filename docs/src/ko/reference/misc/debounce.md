# debounce <Lang dart js python />

지정된 함수가 반복적으로 실행될 때, 지정된 시간 제한 내에 다시 호출되지 않으면 함수가 호출됩니다. 이 함수는 반복적인 입력 이벤트에 대해 소량의 함수 호출이 필요할 때 사용됩니다.

예를 들어, `func` 변수가 `const func = debounce(() => console.log('hello'), 1000)`로 작성되어 있고, 100ms의 대기 간격으로 `func` 함수를 100번 반복하면, 함수는 1000ms 후에 한 번만 실행됩니다. 왜냐하면 함수가 100ms 간격으로 실행되었기 때문입니다. 그러나 대기 간격을 100ms에서 1100ms 이상으로 늘리고 100번 반복하면, 이 기능은 의도한 대로 100번 모두 실행됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'func', type: 'function', required: true },
	{ name: 'timeout', type: 'number', required: true }
]" />

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

# debounce는 래퍼 함수를 반환합니다. 타임아웃(밀리초) 안에 반복 호출하면
# 타이머가 초기화되어, 호출이 멈춘 뒤에야 func가 한 번 실행됩니다.
def on_key_up():
	print('handleKeyUp called.')

key_up_debounce = debounce(on_key_up, 100)

key_up_debounce()  # 100ms 윈도우 안에서는 마지막 호출만 실행됩니다
```
