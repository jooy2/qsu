# capitalizeEverySentence <Lang dart js python />

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'splitChar', type: 'string', named: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', '!'); // Returns 'Hello!World'
```

```dart [Dart]
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', splitChar: '!'); // Returns 'Hello!World'
```

```python [Python]
capitalizeEverySentence('hello. world. hi.')  # Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', '!')  # Returns 'Hello!World'
```

:::
