# replaceBetween <Lang dart js />

지정된 문자열에서 특정 문자로 시작하고 끝나는 범위 내의 텍스트를 다른 문자열로 대체합니다. 예를 들어, `abc<DEF>ghi`라는 문자열이 주어졌을 때, `<DEF>`를 `def`로 바꾸려면, `replaceBetween('abc<DEF>ghi', '<', '>', 'def')`를 사용합니다. 결과는 `abcdefghi`가 됩니다.

`replaceWith`가 지정되지 않은 경우, 범위 내의 문자열을 삭제합니다.

## Parameters

- `str::string`
- `startChar::string`
- `endChar::string`
- `replaceWith::string || ''`

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```

```dart [Dart]
replaceBetween('ab[c]d[e]f', '[', ']'); // Returns 'abdf'
replaceBetween('abcd:replace:', ':', ':', 'e'); // Returns 'abcde'
```

:::
