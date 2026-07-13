# getUptime <Lang js python />

<NodeRequired en />

Returns the number of seconds the Node.js process has been running.

## Parameters

<ParamsTable :rows="[
	{ name: 'opt', type: 'GetUptimeOption' }
]" />

<ParamsTable name="GetUptimeOption" :rows="[
	{ name: 'format', type: 'boolean' },
	{ name: 'floor', type: 'boolean' }
]" />

## Returns

> number | string

## Examples

::: code-group

```javascript [JavaScript]
console.log(getUptime()); // Returns 1234
console.log(getUptime({ floor: true })); // Returns 1234.123456789
console.log(getUptime({ format: true })); // Returns '1,234'
```

```python [Python]
print(getUptime())  # Returns 1234
print(getUptime({ 'floor': True }))  # Returns 1234.123456789
print(getUptime({ 'format': True }))  # Returns '1,234'
```

:::
