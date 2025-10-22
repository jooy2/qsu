# contains <Lang dart js />

첫 번째 문자열 인수가 두 번째 인수 `string` 또는 "배열에 나열된 문자열 중 하나 이상"을 포함하는 경우 `true`를 반환합니다. 정확한 값이 `true`인 경우, 정확히 일치하는 경우에만 true를 반환합니다.

## Parameters

- `str::any[]|string`
- `search::any[]|string`
- `exact::boolean || false` <span class="named">Dart:Named</span>

## Returns

> boolean

## Examples

```javascript
contains('abc', 'a'); // Returns true
contains('abc', 'd'); // Returns false
contains('abc', ['a', 'd']); // Returns true
```
