# sleep <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Sleep function using Promise.

## Parameters

- `milliseconds::number`

## Returns

> Promise:boolean

## Examples

```javascript
await sleep(1000); // 1s

sleep(5000).then(() => {
	// continue
});
```
