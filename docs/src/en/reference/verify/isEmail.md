# isEmail <Lang dart js />

Checks if the given argument value is a valid email.

## Parameters

- `email::string`
- `onlyLowerCase::boolean || false` <DartNamed />

## Returns

> boolean

## Examples

::: code-group

```javascript [JavaScript]
isEmail('abc@def.com'); // Returns true
isEmail('ABC@def.com', true); // Returns false
```

```dart [Dart]
isEmail('abc@def.com'); // Returns true
isEmail('ABC@def.com', true); // Returns false
```

:::
