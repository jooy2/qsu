# runCommand <Badge type="tip" text="JavaScript" />

<span class="node-required">Node.js 런타임 필요 ('qsu/node')</span>

명령 프롬프트 커맨드를 입력하고 실행 후 출력되는 결과를 리턴합니다.

## Parameters

- `command::string`

## Returns

> string

## Examples

```javascript
console.log(await runCommand('echo a')); // Returns 'a\n'
```
