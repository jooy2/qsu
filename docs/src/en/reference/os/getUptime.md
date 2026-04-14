# getUptime <Lang js />

<NodeRequired en />

Returns the number of seconds the Node.js process has been running.

## Parameters

- `GetUptimeOption::object`

```typescript
interface GetUptimeOption {
	format?: boolean;
	floor?: boolean;
}
```

## Returns

> number | string

## Examples

```javascript
console.log(getUptime()); // Returns 1234
console.log(getUptime({ floor: true })); // Returns 1234.123456789
console.log(getUptime({ format: true })); // Returns '1,234'
```
