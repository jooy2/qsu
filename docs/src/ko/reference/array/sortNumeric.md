# sortNumeric <Lang js />

문자열로 구성된 배열을 정렬할 때, 이름이 아니라 문자열에 포함된 숫자 순서로 정렬됩니다. 예를 들어, 배열 `['1-a', '100-a', '10-a', '2-a']`가 주어지면, 더 작은 숫자가 앞에 오도록 `['1-a', '2-a', '10-a', '100-a']`가 반환됩니다.

## Parameters

- `array::string[]`
- `descending::boolean`

## Returns

> string[]

## Examples

::: code-group

```javascript [JavaScript]
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

```dart [Dart]
sortNumeric(['a1a', 'b2a', 'aa1a', '1', 'a11a', 'a3a', 'a2a', '1a']);
// Returns ['1', '1a', 'a1a', 'a2a', 'a3a', 'a11a', 'aa1a', 'b2a']
```

:::
