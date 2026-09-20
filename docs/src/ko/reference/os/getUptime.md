# getUptime
<NodeRequired ko />

현재 프로세스가 실행된 시간을 초로 리턴합니다.

`floor`는 소수점을 버리고, `format`은 천 단위로 자릿수를 끊습니다. `format`만 주면 버리지 않은 값을 그대로 포맷하므로, `1,234`로 읽으려면 둘 다 넘기십시오.

## Parameters

<ParamsTable :rows="[
	{ name: 'opt', type: 'GetUptimeOption', named: true }
]" />

<ParamsTable name="GetUptimeOption" :rows="[
	{ name: 'format', type: 'boolean', default: 'false' },
	{ name: 'floor', type: 'boolean', default: 'false' }
]" />

## Returns

<ReturnType :type="{ js: 'number | string', python: 'int | float | str' }" />

## Examples

::: lang js

```javascript
console.log(getUptime()); // Returns 1234.123456789
console.log(getUptime({ floor: true })); // Returns 1234
console.log(getUptime({ format: true })); // Returns '1,234.123456789'
console.log(getUptime({ floor: true, format: true })); // Returns '1,234'
```

:::

::: lang python

```python
print(getUptime())  # Returns 1234.123456789
print(getUptime({'floor': True}))  # Returns 1234
print(getUptime({'format': True}))  # Returns '1,234.123456789'
print(getUptime({'floor': True, 'format': True}))  # Returns '1,234'
```

:::
