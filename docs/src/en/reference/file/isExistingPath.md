# isExistingPath

<NodeRequired en />

If a file or directory exists at the specified path, it returns `true`.

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
