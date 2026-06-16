# runCommand <Lang js python />

<NodeRequired en />

It returns the result that is output after entering and executing the command prompt command.

## Parameters

- `command::string`

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
