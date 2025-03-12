# runCommand <Badge type="tip" text="JavaScript" />

<span class="node-required">Requires a Node.js runtime ('qsu/node')</span>

It returns the result that is output after entering and executing the command prompt command.

## Parameters

- `command::string`

## Returns

> string

## Examples

```javascript
console.log(await runCommand('echo a')); // Returns 'a\n'
```
