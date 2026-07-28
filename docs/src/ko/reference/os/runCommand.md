# runCommand <Lang js python />

<NodeRequired ko />

명령 프롬프트 커맨드를 입력하고 실행 후 출력되는 결과를 리턴합니다.

::: danger 신뢰할 수 없는 입력을 전달하지 마세요
명령은 시스템 셸을 통해 실행되므로 셸이 해석하는 모든 문법이 그대로 동작합니다. 사용자 입력을 이어 붙여 명령을 만들면 임의의 명령이 실행될 수 있습니다. 예를 들어 `runCommand('ls ' + userInput)`에 `.; rm -rf ~`가 들어오면 두 명령이 모두 실행됩니다. 코드가 직접 결정한 명령에만 사용하세요.
:::

타임아웃이 없으므로 종료되지 않는 명령을 실행하면 호출이 무한정 대기합니다. JavaScript에서는 출력 크기도 기본 `maxBuffer`(1MB)로 제한되며, 이를 초과하면 호출이 실패합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'command', type: 'string', required: true, desc: '실행할 명령입니다. 셸을 통해 실행됩니다.' }
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
