# getUptime <Lang js />

<NodeRequired ko />

현재 Node.js 프로세스가 실행된 시간을 초로 리턴합니다.

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
