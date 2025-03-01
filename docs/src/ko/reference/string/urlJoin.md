# urlJoin <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

주어진 문자열 인수를 첫 번째 인수(URL의 시작)와 합쳐서 슬래시(/) 기호가 올바르게 포함되도록 연결합니다.

Dart에서는 하나의 인자만 받아들이며, 인자는 List로 구성됩니다.

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
