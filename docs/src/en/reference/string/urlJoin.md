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

::: code-group

```javascript [JavaScript]
urlJoin('https://example.com', 'hello', 'world'); // Returns 'https://example.com/hello/world'
```

```dart [Dart]
urlJoin(['https://example.com', 'hello', 'world']); // Returns 'https://example.com/hello/world'
```

```python [Python]
urlJoin('https://example.com', 'hello', 'world')  # Returns 'https://example.com/hello/world'
```

:::
