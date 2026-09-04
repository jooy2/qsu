# isEmail <Lang dart js python />

Checks if the given argument value is a valid email.

## Parameters

<ParamsTable :rows="[
	{ name: 'email', type: 'string', required: true },
	{ name: 'onlyLowerCase', type: 'boolean', default: 'false', named: true }
]" />

## Returns

> boolean

## Examples

::: lang js

```javascript
isEmail('abc@def.com'); // Returns true
isEmail('ABC@def.com', true); // Returns false
```

:::

::: lang dart

```dart
isEmail('abc@def.com'); // Returns true
isEmail('ABC@def.com', true); // Returns false
```

:::

::: lang python

```python
isEmail('abc@def.com')  # Returns True
isEmail('ABC@def.com', True)  # Returns False
```

:::
