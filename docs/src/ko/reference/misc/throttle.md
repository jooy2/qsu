# throttle <Lang dart js python />

함수가 실행되는 빈도를 제한합니다. 반환된 래퍼를 몇 번 호출하든, 실제 함수는 `wait` 구간마다 최대 한 번만 실행됩니다.

`debounce`와 짝을 이루는 함수입니다. `debounce`는 호출이 멈추기를 기다렸다가 한 번 실행하고, `throttle`은 호출이 계속되는 동안 일정한 간격으로 계속 실행합니다. 스크롤·리사이즈·마우스 이동·진행률 갱신처럼 끊임없이 발생하는 이벤트에 사용합니다.

기본 동작은 호출 즉시 한 번 실행하고(leading edge), 구간이 끝날 때 가장 최근 인자로 한 번 더 실행하는 것(trailing edge)입니다. 옵션으로 각각을 끌 수 있습니다.

- `leading: false` — 즉시 실행하지 않고, 첫 호출은 구간만 열어둔 뒤 구간이 끝날 때 실행됩니다.
- `trailing: false` — leading 호출만 실행되고, 구간 중에 발생한 호출은 버려집니다.
- 둘 다 `false`이면 함수는 실행되지 않습니다.

::: lang python

`debounce`와 마찬가지로 백그라운드 스레드를 사용해 예약하므로, trailing 호출은 해당 스레드에서 실행됩니다.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'func', type: 'function', required: true, desc: '제한할 함수입니다. 래퍼가 받은 인자를 그대로 전달합니다.' },
	{ name: 'wait', type: 'number', required: true, desc: '구간의 길이(밀리초)입니다.' },
	{ name: 'options', type: 'ThrottleOptions', named: true, desc: '아래 표를 참고하세요.' }
]" />

<ParamsTable name="ThrottleOptions" :rows="[
	{ name: 'leading', type: 'boolean', default: 'true', desc: '구간의 시작 시점에 실행합니다.' },
	{ name: 'trailing', type: 'boolean', default: 'true', desc: '구간이 끝날 때 가장 최근 호출의 인자로 한 번 더 실행합니다.' }
]" />

## Returns

<ReturnType type="function" />

## Examples

::: lang js

```javascript
const onScroll = throttle((position) => {
	console.log(position);
}, 100);

onScroll(1); // 즉시 실행
onScroll(2); // 버려짐
onScroll(3); // 100ms 구간이 끝날 때 실행

// trailing edge만 사용
const save = throttle(sendToServer, 1000, { leading: false });

// leading edge만 사용
const track = throttle(sendEvent, 1000, { trailing: false });
```

:::

::: lang dart

```dart
final onScroll = throttle((position) {
  print(position);
}, 100);

onScroll([1]); // 즉시 실행
onScroll([2]); // 버려짐
onScroll([3]); // 100ms 구간이 끝날 때 실행

// trailing edge만 사용
final save = throttle(sendToServer, 1000, leading: false);

// leading edge만 사용
final track = throttle(sendEvent, 1000, trailing: false);
```

:::

::: lang python

```python
on_scroll = throttle(lambda position: print(position), 100)

on_scroll(1)  # 즉시 실행
on_scroll(2)  # 버려짐
on_scroll(3)  # 100ms 구간이 끝날 때 실행

# trailing edge만 사용
save = throttle(send_to_server, 1000, {'leading': False})

# leading edge만 사용
track = throttle(send_event, 1000, trailing=False)
```

:::
