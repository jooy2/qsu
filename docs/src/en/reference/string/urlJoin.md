# urlJoin <Lang dart js python />

Merges the given string argument with the first argument (the beginning of the URL), joining it so that the slash (`/`) symbol is correctly included.

::: lang dart

The segments are passed as a single list rather than as separate arguments.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'args', type: { js: '...any[]', dart: 'List<String?>' }, required: true, desc: { js: 'URL segments to join, as separate arguments.', dart: 'URL segments to join, as a single list.' } }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
urlJoin('https://example.com', 'hello', 'world'); // Returns 'https://example.com/hello/world'
```

:::

::: lang dart

```dart
urlJoin(['https://example.com', 'hello', 'world']); // Returns 'https://example.com/hello/world'
```

:::

::: lang python

```python
urlJoin('https://example.com', 'hello', 'world')  # Returns 'https://example.com/hello/world'
```

:::
