# decodeBase64
<NodeRequired en />

Decodes an encoded base64 string to a plain string.

## Parameters

<ParamsTable :rows="[
	{ name: 'encodedStr', type: 'string', required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

:::

::: lang dart

```dart
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

:::

::: lang python

```python
decodeBase64('dGhpcyBpcyB0ZXN0')  # Returns 'this is test'
```

:::
