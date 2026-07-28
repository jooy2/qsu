# logBox <Lang js python />

<NodeRequired en />

Prints the given values to the console as a bordered table, one row per argument, so that long or structured values stay readable. The box is sized to the terminal width, and objects are expanded rather than shown as `[object Object]`.

Values wider than the terminal are wrapped, and East Asian characters and emoji are measured by their display width so the borders stay aligned.

## Parameters

<ParamsTable :rows="[
	{ name: 'args', type: '...any', desc: 'The values to print. Each one becomes a row. With no arguments, an empty table is printed.' }
]" />

## Returns

> void

## Examples

::: code-group

```javascript [JavaScript]
import { logBox } from 'qsu/node';

logBox([1, 2, 3, 4, 5]);
logBox('hello', { a: 1 });
```

```python [Python]
logBox([1, 2, 3, 4, 5])
logBox('hello', {'a': 1})
```

:::

Output:

```text
┌───┬──────────────────────────────────────────────────────────┐
│ # │ value                                                    │
├───┼──────────────────────────────────────────────────────────┤
│ 0 │ [ 1, 2, 3, 4, 5 ]                                        │
└───┴──────────────────────────────────────────────────────────┘
```
