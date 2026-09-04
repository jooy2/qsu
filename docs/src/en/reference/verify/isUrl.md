# isUrl
Returns `true` if the given data is in the correct URL format. If withProtocol is `true`, it is automatically appended to the URL when the protocol does not exist. If strict is `true`, URLs without commas (`.`) return `false`.

## Parameters

<ParamsTable :rows="[
	{ name: 'url', type: 'string', required: true },
	{ name: 'withProtocol', type: 'boolean', default: 'false', named: true },
	{ name: 'strict', type: 'boolean', default: 'false', named: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isUrl('google.com'); // Returns false
isUrl('google.com', true); // Returns true
isUrl('https://google.com'); // Returns true
```

:::

::: lang dart

```dart
isUrl('google.com'); // Returns false
isUrl('google.com', withProtocol: true); // Returns true
isUrl('https://google.com'); // Returns true
```

:::

::: lang python

```python
isUrl('google.com')  # Returns False
isUrl('google.com', True)  # Returns True
isUrl('https://google.com')  # Returns True
```

:::
