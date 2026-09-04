# removeSpecialChar <Lang dart js python />

Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'exceptionCharacters', type: 'string', named: true }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', ' -'); // Returns 'Hello-qsu World'
```

:::

::: lang dart

```dart
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', exceptionCharacters: ' -'); // Returns 'Hello-qsu World'
```

:::

::: lang python

```python
removeSpecialChar('Hello-qsu, World!')  # Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', ' -')  # Returns 'Hello-qsu World'
```

:::
