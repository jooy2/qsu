# safeParseInt <Lang dart js />

어떤 인수 값이든 오류 없이 숫자 유형으로 구문 분석하려고 시도합니다. 구문 분석에 실패하면 `fallback`에 설정된 숫자로 대체됩니다. `fallback`의 기본값은 `0`입니다. 세 번째 인수에 `radix`(기본값은 십진수: `10`)를 지정할 수 있습니다.

## Parameters

- `value::any`
- `fallback::number`
- `radix::number`

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
const result1 = safeParseInt('00010');
const result2 = safeParseInt('10.1234');
const result3 = safeParseInt(null, -1);

console.log(result1); // Returns 10
console.log(result2); // Returns 10
console.log(result3); // Returns -1
```

```dart [Dart]
final result1 = safeParseInt('00010');
final result2 = safeParseInt('10.1234');
final result3 = safeParseInt(null, -1);

print(result1); // Returns 10
print(result2); // Returns 10
print(result3); // Returns -1
```

:::
