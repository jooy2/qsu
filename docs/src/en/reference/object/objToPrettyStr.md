# objToPrettyStr
Recursively output all the steps of the JSON object (`JSON.stringify`) and then output the JSON object with newlines and tab characters to make it easier to read in a `console` function, for example.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
objToPrettyStr({ a: 1, b: { c: 1, d: 2 } }); // Returns '{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
```

:::

::: lang python

```python
objToPrettyStr({ 'a': 1, 'b': { 'c': 1, 'd': 2 } })  # Returns '{\n\t"a": 1,\n\t"b": {\n\t\t"c": 1,\n\t\t"d": 2\n\t}\n}'
```

:::
