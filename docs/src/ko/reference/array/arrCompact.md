# arrCompact <Lang dart js python />

falsy 값을 모두 제거한 새 배열을 반환합니다.

Dart와 Python에는 JavaScript와 같은 truthiness 개념이 없기 때문에, 제거 대상은 언어에 맡기지 않고 다음으로 고정되어 있습니다. `null`(JavaScript의 `undefined`, Python의 `None` 포함), `false`, `0`(`-0`과 `0.0` 포함), 빈 문자열 `''`, 그리고 `NaN`입니다. 그 외의 값은 모두 유지되므로 빈 배열, 빈 객체, 공백만 있는 문자열은 그대로 남습니다.

인자가 배열이 아니면 빈 배열을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true, desc: '정리할 배열입니다. 원본 배열은 변경되지 않습니다.' }
]" />

## Returns

> any[]

## Examples

::: lang js

```javascript
arrCompact([0, 1, false, 2, '', 3, null, undefined, NaN]); // Returns [1, 2, 3]
arrCompact([false, 0, '', null]); // Returns []
arrCompact([[], {}, ' ', '0']); // Returns [[], {}, ' ', '0']
arrCompact([true, -1, 0.5]); // Returns [true, -1, 0.5]
```

:::

::: lang dart

```dart
arrCompact([0, 1, false, 2, '', 3, null, double.nan]); // Returns [1, 2, 3]
arrCompact([false, 0, '', null]); // Returns []
arrCompact([[], {}, ' ', '0']); // Returns [[], {}, ' ', '0']
arrCompact([true, -1, 0.5]); // Returns [true, -1, 0.5]
```

:::

::: lang python

```python
arrCompact([0, 1, False, 2, '', 3, None, float('nan')])  # Returns [1, 2, 3]
arrCompact([False, 0, '', None])  # Returns []
arrCompact([[], {}, ' ', '0'])  # Returns [[], {}, ' ', '0']
arrCompact([True, -1, 0.5])  # Returns [True, -1, 0.5]
```

:::
