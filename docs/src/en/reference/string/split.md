# split
Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'splitter', type: { js: 'string | string[] | ...string', dart: 'List<String>' }, required: true }
]" />

## Returns

<ReturnType type="string[]" />

## Examples

::: lang js

```javascript
split('hello% js world', '% '); // Returns ['hello', 'js world']
split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

:::

::: lang dart

```dart
split('hello% js world', ['% ']); // Returns ['hello', 'js world']
split('hello,js,world', [',']); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```

:::

::: lang python

```python
split('hello% js world', '% ')  # Returns ['hello', 'js world']
split('hello,js,world', ',')  # Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%')  # Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%'])  # Returns ['hello', 'js', 'world']
```

:::
