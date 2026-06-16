# isEmail <Lang dart js python />

주어진 인수 값이 유효한 이메일인지 확인합니다.

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

```python [Python]
isEmail('abc@def.com')  # Returns True
isEmail('ABC@def.com', True)  # Returns False
```

:::
