# sleep <Lang dart js />

Promise를 이용한 수면 기능.

## Parameters

- `milliseconds::number`

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

:::
