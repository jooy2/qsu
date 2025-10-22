# urlJoin <Lang dart js />

Merges the given string argument with the first argument (the beginning of the URL), joining it so that the slash (`/`) symbol is correctly included.

In Dart, accepts only one argument, organized as an List.

## Parameters

- `args::...any[]` (JavaScript)
- `args::List<dynamic>` (Dart)

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

:::
