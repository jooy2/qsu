# sleep <Lang dart js python />

Promise를 이용한 수면 기능.

## Parameters

<ParamsTable :rows="[
	{ name: 'milliseconds', type: 'number', required: true }
]" />

## Returns

> Promise:boolean

## Examples

::: code-group

```javascript [JavaScript]
await sleep(1000); // 1s

sleep(5000).then(() => {
	// continue
});
```

```dart [Dart]
await sleep(1000); // 1s

sleep(5000).then(() => {
// continue
});
```

```python [Python]
sleep(1000)  # 1s (blocks synchronously)

sleep(5000)
# continue
```

:::
