# toPosixFilePath <Lang js dart python />

<NodeRequired ko />

지정된 경로를 POSIX 형식(주로 리눅스에서 사용)의 경로로 반환합니다. 예를 들어, 윈도우 경로는 `\\` 대신 `/`로 변환됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```

:::

::: lang dart

```dart
toPosixFilePath('C:\\Windows\\System32'); // 'C:/Windows/System32'
```

:::

::: lang python

```python
toPosixFilePath('C:\\Windows\\System32') # 'C:/Windows/System32'
```

:::
