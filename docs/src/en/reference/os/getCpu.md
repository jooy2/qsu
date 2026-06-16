# getCpu <Lang js python />

<NodeRequired en />

This function returns the name of the CPU currently used by the system. Depending on the OS, the name may be incorrect or may not be retrievable.

## Parameters

No required parameters

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
console.log(await getCpu()); // e.g. 'Apple M1'...
```

```python [Python]
print(getCpu())  # e.g. 'Apple M1'...
```

:::
