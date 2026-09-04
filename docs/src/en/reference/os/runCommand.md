# runCommand <Lang js python />

<NodeRequired en />

It returns the result that is output after entering and executing the command prompt command.

::: danger Never pass untrusted input
The command runs through the system shell, so anything the shell understands is executed. Building a command by concatenating user input allows arbitrary commands to run: `runCommand('ls ' + userInput)` with an input of `.; rm -rf ~` runs both. Only call this with commands your own code decides.
:::

There is no timeout, so a command that never returns leaves the call pending forever. In JavaScript the output is also limited by the default `maxBuffer` (1 MB) and the call fails once it is exceeded.

## Parameters

<ParamsTable :rows="[
	{ name: 'command', type: 'string', required: true, desc: 'The command to run. It is executed through the shell.' }
]" />

## Returns

<ReturnType type="Promise<string | null>" />

## Examples

::: lang js

```javascript
console.log(await runCommand('echo a')); // Returns 'a'
```

:::

::: lang python

```python
print(runCommand('echo a'))  # Returns 'a'
```

:::
