# safeJSONParse <Lang dart js />

인수 값이 잘못된 유형이거나 `JSON` 형식인 경우에도 오류를 반환하지 않고 구문 분석을 시도합니다. 구문 분석이 실패하면 `fallback`에 설정된 객체로 대체됩니다. `fallback`의 기본값은 빈 객체입니다.

## Parameters

- `jsonString::any`
- `fallback::object` <DartNamed />

## Returns

> object

## Examples

::: code-group

```javascript [JavaScript]
const result1 = safeJSONParse('{"a":1,"b":2}');
const result2 = safeJSONParse(null);

console.log(result1); // Returns { a: 1, b: 2 }
console.log(result2); // Returns {}
```

```dart [Dart]
final result1 = safeJSONParse('{"a":1,"b":2}');
final result2 = safeJSONParse(null);

print(result1); // Returns { a: 1, b: 2 }
print(result2); // Returns {}
```

:::
