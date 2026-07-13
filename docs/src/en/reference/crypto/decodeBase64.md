# decodeBase64 <Lang dart js python />

<NodeRequired en />

Decodes an encoded base64 string to a plain string.

## Parameters

<ParamsTable :rows="[
	{ name: 'encodedStr', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

```dart [Dart]
decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

```python [Python]
decodeBase64('dGhpcyBpcyB0ZXN0')  # Returns 'this is test'
```

:::
