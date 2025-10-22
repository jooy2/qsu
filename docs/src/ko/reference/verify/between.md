# between <Lang dart js />

첫 번째 인수가 두 번째 인수(`[min, max]`)의 범위 내에 있으면 `true`를 반환합니다. 최소값과 최대값이 범위 내에 있도록 하려면 세 번째 인수로 `true`를 전달합니다.

## Parameters

- `range::[number, number]`
- `number::number`
- `inclusive::boolean || false` <span class="named">Dart:Named</span>

## Returns

> boolean

## Examples

```javascript
between([10, 20], 10); // Returns false
between([10, 20], 10, true); // Returns true
```
