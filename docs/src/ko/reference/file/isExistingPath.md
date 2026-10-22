# isExistingPath

<NodeRequired ko />

지정된 경로에 대한 파일이나 디렉토리가 존재하면 `true`를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'filePath', type: 'string', required: true }
]" />

## Returns

<ReturnType type="Promise<boolean>" />

## Examples

::: lang js

```javascript
await isExistingPath('text.txt'); // true
await isExistingPath('not-exist.txt'); // false
```

:::

::: lang dart

```dart
await isExistingPath('text.txt'); // true
await isExistingPath('not-exist.txt'); // false
```

:::

::: lang python

```python
isExistingPath('text.txt') # True
isExistingPath('not-exist.txt') # False
```

:::
