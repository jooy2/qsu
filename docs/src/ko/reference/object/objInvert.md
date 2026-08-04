# objInvert <Lang dart js python />

키와 값을 서로 바꾼 새 객체를 반환합니다. 각 값이 키가 되고, 그 값이 있던 키가 값이 됩니다.

키는 항상 문자열이므로 값을 먼저 문자열로 변환합니다. `null`은 `'null'`, `true`는 `'true'`가 되며, 소수부가 없는 숫자는 모든 언어에서 정수 형태로 기록되므로 Dart와 Python에서도 `1.0`은 JavaScript와 동일하게 `'1'`이 됩니다.

최상위 항목만 처리하며, 두 항목의 값이 같으면 같은 키로 들어가므로 나중 항목이 남습니다. 문자열·숫자·불리언·`null`이 아닌 값은 의미 있는 문자열 표현이 없으므로, 그 경우의 결과는 각 언어가 출력하는 형태를 따르며 API의 일부로 보장하지 않습니다.

원본 객체는 변경되지 않습니다. 인자가 객체가 아니면 `null`을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'obj', type: 'object', required: true, desc: '키와 값을 바꿀 객체입니다. 원본은 변경되지 않습니다.' }
]" />

## Returns

> object | null

## Examples

::: code-group

```javascript [JavaScript]
objInvert({ a: 1, b: 2 }); // Returns { '1': 'a', '2': 'b' }
objInvert({ a: 'x', b: 'y' }); // Returns { x: 'a', y: 'b' }
objInvert({ a: 1, b: 1 }); // Returns { '1': 'b' }
objInvert({ a: true, b: null }); // Returns { true: 'a', null: 'b' }
```

```dart [Dart]
objInvert({'a': 1, 'b': 2}); // Returns {'1': 'a', '2': 'b'}
objInvert({'a': 'x', 'b': 'y'}); // Returns {'x': 'a', 'y': 'b'}
objInvert({'a': 1, 'b': 1}); // Returns {'1': 'b'}
objInvert({'a': true, 'b': null}); // Returns {'true': 'a', 'null': 'b'}
```

```python [Python]
objInvert({'a': 1, 'b': 2})  # Returns {'1': 'a', '2': 'b'}
objInvert({'a': 'x', 'b': 'y'})  # Returns {'x': 'a', 'y': 'b'}
objInvert({'a': 1, 'b': 1})  # Returns {'1': 'b'}
objInvert({'a': True, 'b': None})  # Returns {'true': 'a', 'null': 'b'}
```

:::
