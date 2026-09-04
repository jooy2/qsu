# urlJoin <Lang dart js python />

Merges the given string argument with the first argument (the beginning of the URL), joining it so that the slash (`/`) symbol is correctly included.

In Dart, accepts only one argument, organized as an List.

## Parameters

<ParamsTable :rows="[
	{ name: 'args', type: '...any[]', required: true, desc: 'URL segments to join (rest parameter). In Dart, pass a single `List<dynamic>`.' }
]" />

## Returns

> string

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
