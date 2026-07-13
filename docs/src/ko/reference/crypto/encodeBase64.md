# encodeBase64 <Lang dart js python />

<NodeRequired ko />

지정된 문자열을 Base64로 인코딩합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
encodeBase64('this is test'); // Returns 'dGhpcyBpcyB0ZXN0'
```

```dart [Dart]
encodeBase64('this is test'); // Returns 'dGhpcyBpcyB0ZXN0'
```

```python [Python]
encodeBase64('this is test')  # Returns 'dGhpcyBpcyB0ZXN0'
```

:::
