# sub <Lang js dart python />

숫자의 인수 n 개 또는 숫자의 단일 배열 값을 모두 뺀 값을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'numbers', type: '...number[]', required: true }
]" />

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
sub(10, 1, 5); // Returns 4
sub([1, 2, 3, 4]); // Returns -8
```

```python [Python]
sub(10, 1, 5) # Returns 4
sub([1, 2, 3, 4]) # Returns -8
```

:::
