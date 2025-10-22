# duration <Lang js />

주어진 밀리초 값을 사람이 읽을 수 있는 시간으로 표시합니다. 예를 들어, `604800000`(7일)의 값은 `7 Days`로 표시됩니다.

## Parameters

- `milliseconds::number`
- `options::DurationOptions | undefined`

```typescript
const {
	// Converts to `Days` -> `D`, `Hours` -> `H`,  `Minutes` -> `M`, `Seconds` -> `S`, `Milliseconds` -> `ms`
	useShortString = false,
	// Use space (e.g. `1Days` -> `1 Days`)
	useSpace = true,
	// Do not include units with a value of 0.
	withZeroValue = false,
	// Use Separator (e.g. If separator value is `-`, result is: `1 Hour 10 Minutes` -> `1 Hour-10 Minutes`)
	separator = ' '
}: DurationOptions = options;
```

## Returns

> string

## Examples

```javascript
duration(1234567890); // 'Returns '14 Days 6 Hours 56 Minutes 7 Seconds 890 Milliseconds'
duration(604800000, {
	useSpace: false
}); // Returns '7Days'
```
