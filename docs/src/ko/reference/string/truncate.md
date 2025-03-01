# truncate <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

긴 문자열을 지정된 길이로 잘라내고, 문자열 뒤에 선택적으로 줄임표를 추가합니다.

## Parameters

- `str::string`
- `length::number`
- `ellipsis::string || ''` <span class="named">Dart:Named</span>

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, '...'); // Returns 'he...'
```

```dart [Dart]
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```

:::
