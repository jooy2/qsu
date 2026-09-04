# sleep <Lang dart js python />

Sleep function using Promise.

## Parameters

<ParamsTable :rows="[
	{ name: 'milliseconds', type: 'number', required: true }
]" />

## Returns

<ReturnType type="Promise<void>" />

## Examples

::: lang js

```javascript
await sleep(1000); // 1s

sleep(5000).then(() => {
	// continue
});
```

:::

::: lang dart

```dart
await sleep(1000); // 1s

sleep(5000).then(() => {
// continue
});
```

:::

::: lang python

```python
sleep(1000)  # 1s (blocks synchronously)

sleep(5000)
# continue
```

:::
