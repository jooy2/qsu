# urlJoin <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Merges the given string argument with the first argument (the beginning of the URL), joining it so that the slash (`/`) symbol is correctly included.

In Dart, accepts only one argument, organized as an List.

## Parameters

- `args::...any[]` (JavaScript)
- `args::List<dynamic>` (Dart)

## Returns

> string

## Examples

```javascript
urlJoin('https://example.com', 'hello', 'world'); // Returns 'https://example.com/hello/world'
```

```dart
urlJoin(['https://example.com', 'hello', 'world']); // Returns 'https://example.com/hello/world'
```
