# removeSpecialChars

Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'allowedCharacters', type: 'string', named: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
removeSpecialChars('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChars('Hello-qsu, World!', ' -'); // Returns 'Hello-qsu World'
```

:::

::: lang dart

```dart
removeSpecialChars('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChars('Hello-qsu, World!', allowedCharacters: ' -'); // Returns 'Hello-qsu World'
```

:::

::: lang python

```python
removeSpecialChars('Hello-qsu, World!')  # Returns 'HelloqsuWorld'
removeSpecialChars('Hello-qsu, World!', ' -')  # Returns 'Hello-qsu World'
```

:::
