# capitalizeEverySentence <Lang dart js python />

Capitalize the first letter of every sentence. Typically, the `.` characters to separate sentences, but this can be customized via the value of the `splitChar` argument.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'splitChar', type: 'string', named: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', '!'); // Returns 'Hello!World'
```

:::

::: lang dart

```dart
capitalizeEverySentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', splitChar: '!'); // Returns 'Hello!World'
```

:::

::: lang python

```python
capitalizeEverySentence('hello. world. hi.')  # Returns 'Hello. World. Hi.'
capitalizeEverySentence('hello!world', '!')  # Returns 'Hello!World'
```

:::
