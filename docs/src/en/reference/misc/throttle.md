# throttle <Lang dart js python />

Limits how often a function may run: however many times the returned wrapper is called, the function itself runs at most once per `wait` window.

This is the counterpart of `debounce`. `debounce` waits for the calls to stop and then runs once; `throttle` keeps running at a steady rate while the calls continue. Use it for events that fire continuously — scrolling, resizing, mouse movement, progress updates.

By default a call fires immediately (the leading edge) and one more call fires at the end of the window carrying the most recent arguments (the trailing edge). Turn either off with the options:

- `leading: false` — nothing fires immediately; the first call only opens the window and fires when it ends.
- `trailing: false` — only the leading call fires; calls made during the window are dropped.
- With both `false` the function never runs.

In Python the wrapper is scheduled with a background thread, exactly as `debounce` is, so the trailing call runs on that thread.

## Parameters

<ParamsTable :rows="[
	{ name: 'func', type: 'function', required: true, desc: 'The function to throttle. The wrapper passes its own arguments through.' },
	{ name: 'wait', type: 'number', required: true, desc: 'Length of the window in milliseconds.' },
	{ name: 'options', type: 'ThrottleOptions', named: true, desc: 'See the table below.' }
]" />

<ParamsTable name="ThrottleOptions" :rows="[
	{ name: 'leading', type: 'boolean', default: 'true', desc: 'Run on the leading edge of the window.' },
	{ name: 'trailing', type: 'boolean', default: 'true', desc: 'Run once more at the end of the window, with the arguments of the most recent call.' }
]" />

## Returns

> function

## Examples

::: code-group

```javascript [JavaScript]
const onScroll = throttle((position) => {
	console.log(position);
}, 100);

onScroll(1); // Runs immediately
onScroll(2); // Dropped
onScroll(3); // Runs once the 100ms window ends

// Only the trailing edge
const save = throttle(sendToServer, 1000, { leading: false });

// Only the leading edge
const track = throttle(sendEvent, 1000, { trailing: false });
```

```dart [Dart]
final onScroll = throttle((position) {
  print(position);
}, 100);

onScroll([1]); // Runs immediately
onScroll([2]); // Dropped
onScroll([3]); // Runs once the 100ms window ends

// Only the trailing edge
final save = throttle(sendToServer, 1000, leading: false);

// Only the leading edge
final track = throttle(sendEvent, 1000, trailing: false);
```

```python [Python]
on_scroll = throttle(lambda position: print(position), 100)

on_scroll(1)  # Runs immediately
on_scroll(2)  # Dropped
on_scroll(3)  # Runs once the 100ms window ends

# Only the trailing edge
save = throttle(send_to_server, 1000, {'leading': False})

# Only the leading edge
track = throttle(send_event, 1000, trailing=False)
```

:::
