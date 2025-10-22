# sleep <Lang dart js />

Promise를 이용한 수면 기능.

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
