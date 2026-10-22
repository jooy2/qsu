# capitalizeEachSentence

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `separator` argument.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'separator', type: 'string', named: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
capitalizeEachSentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEachSentence('hello!world', '!'); // Returns 'Hello!World'
```

:::

::: lang dart

```dart
capitalizeEachSentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEachSentence('hello!world', separator: '!'); // Returns 'Hello!World'
```

:::

::: lang python

```python
capitalizeEachSentence('hello. world. hi.')  # Returns 'Hello. World. Hi.'
capitalizeEachSentence('hello!world', '!')  # Returns 'Hello!World'
```

:::
