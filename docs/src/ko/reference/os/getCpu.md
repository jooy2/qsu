# getCpu <Lang js python />

<NodeRequired ko />

이 함수는 현재 시스템에서 사용하는 CPU 이름을 반환합니다. OS에 따라 이름이 올바르지 않거나 가져오지 못하는 경우가 있습니다.

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
