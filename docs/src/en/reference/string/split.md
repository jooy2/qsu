# split <Lang js dart python />

Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'splitter', type: 'string | string[] | ...string', required: true }
]" />

## Returns

> string[]

## Examples

::: code-group

```javascript [JavaScript]
split('hello% js world', '% '); // Returns ['hello', 'js world']
split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

```dart [Dart]
split('hello% js world', ['% ']); // Returns ['hello', 'js world']
split('hello,js,world', [',']); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

```python [Python]
split('hello% js world', '% ')  # Returns ['hello', 'js world']
split('hello,js,world', ',')  # Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%')  # Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%'])  # Returns ['hello', 'js', 'world']
```

:::
