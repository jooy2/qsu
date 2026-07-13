# runCommand <Lang js python />

<NodeRequired ko />

명령 프롬프트 커맨드를 입력하고 실행 후 출력되는 결과를 리턴합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'command', type: 'string', required: true }
]" />

## Returns

> string | null

## Examples

::: code-group

```javascript [JavaScript]
console.log(await runCommand('echo a')); // Returns 'a'
```

```python [Python]
print(runCommand('echo a'))  # Returns 'a'
```

:::
