# arrGroupByMaxCount <Lang dart js />

주어진 배열의 데이터를 최대 요소 수만 포함하는 2차원 배열로 분리합니다. 예를 들어, 2개의 그룹에 6개의 데이터가 있는 배열이 있는 경우, 이 함수는 길이가 3인 2차원 배열을 만듭니다.

## Parameters

- `array::any[]`
- `maxLengthPerGroup::number`

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
arrGroupByMaxCount(['a', 'b', 'c', 'd', 'e'], 2);
// Returns [['a', 'b'], ['c', 'd'], ['e']]
```

```dart [Dart]
arrGroupByMaxCount(['a', 'b', 'c', 'd', 'e'], 2);
// Returns [['a', 'b'], ['c', 'd'], ['e']]
```

:::
