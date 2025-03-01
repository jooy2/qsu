# removeSpecialChar <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Returns after removing all special characters, including spaces. If you want to allow any special characters as exceptions, list them in the second argument value without delimiters. For example, if you want to allow spaces and the symbols `&` and `*`, the second argument value would be ' &\*'.

## Parameters

- `str::string`
- `exceptionCharacters::string?` <span class="named">Dart:Named</span>

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', ' -'); // Returns 'Hello-qsu World'
```

```dart [Dart]
removeSpecialChar('Hello-qsu, World!'); // Returns 'HelloqsuWorld'
removeSpecialChar('Hello-qsu, World!', exceptionCharacters: ' -'); // Returns 'Hello-qsu World'
```

:::
