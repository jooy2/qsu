# arrGroupBy

배열의 각 항목을 콜백이 돌려준 키에 따라 묶습니다. 결과에는 키마다 항목이 하나씩 있고, 그 키를 만든 항목들이 원래 순서대로 들어 있습니다.

키는 항상 문자열입니다. 숫자는 JavaScript가 쓰는 방식대로 바뀌므로 `1.0`은 `'1'`이 되고, `true`, `false`, `null`은 `'true'`, `'false'`, `'null'`이 됩니다. 그룹은 키가 처음 나온 순서대로 놓입니다.

정해진 크기로 나누려면 [arrGroupByMaxCount](./arrGroupByMaxCount)를, 값마다 몇 번 나오는지 세려면 [arrCount](./arrCount)를 사용하세요.

::: lang js

JavaScript 객체는 정수처럼 보이는 키를 넣은 순서와 상관없이 항상 오름차순으로 먼저 나열합니다. 그래서 `'10'`과 `'2'`라는 그룹은 `'2'`, `'10'` 순서로 나옵니다.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true, desc: '묶을 항목입니다. 변경되지 않습니다.' },
	{ name: 'callback', type: { js: '(item: T) => string | number | boolean | null', dart: 'Object? Function(T item)', python: 'Callable[[Any], Any]' }, required: true, desc: '항목마다 한 번씩 호출됩니다. 그 항목이 들어갈 그룹의 키를 돌려줍니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'Record<string, T[]>', dart: 'Map<String, List<T>>', python: 'dict[str, list]' }" />

## Examples

::: lang js

```javascript
arrGroupBy([1.2, 1.8, 2.1], Math.floor); // Returns { '1': [1.2, 1.8], '2': [2.1] }
arrGroupBy(['one', 'two', 'three'], (item) => item.length); // Returns { '3': ['one', 'two'], '5': ['three'] }

const foods = [
	{ name: 'apple', type: 'fruit' },
	{ name: 'carrot', type: 'vegetable' },
	{ name: 'pear', type: 'fruit' }
];

arrGroupBy(foods, (food) => food.type);
// Returns { fruit: [{ name: 'apple', ... }, { name: 'pear', ... }], vegetable: [{ name: 'carrot', ... }] }
```

:::

::: lang dart

```dart
arrGroupBy([1.2, 1.8, 2.1], (n) => n.floor()); // Returns {'1': [1.2, 1.8], '2': [2.1]}
arrGroupBy(['one', 'two', 'three'], (item) => item.length); // Returns {'3': ['one', 'two'], '5': ['three']}

final foods = [
  {'name': 'apple', 'type': 'fruit'},
  {'name': 'carrot', 'type': 'vegetable'},
  {'name': 'pear', 'type': 'fruit'},
];

arrGroupBy(foods, (food) => food['type']);
// Returns {'fruit': [{'name': 'apple', ...}, {'name': 'pear', ...}], 'vegetable': [{'name': 'carrot', ...}]}
```

:::

::: lang python

```python
import math

arrGroupBy([1.2, 1.8, 2.1], math.floor)  # Returns {'1': [1.2, 1.8], '2': [2.1]}
arrGroupBy(['one', 'two', 'three'], len)  # Returns {'3': ['one', 'two'], '5': ['three']}

foods = [
	{'name': 'apple', 'type': 'fruit'},
	{'name': 'carrot', 'type': 'vegetable'},
	{'name': 'pear', 'type': 'fruit'},
]

arrGroupBy(foods, lambda food: food['type'])
# Returns {'fruit': [{'name': 'apple', ...}, {'name': 'pear', ...}], 'vegetable': [{'name': 'carrot', ...}]}
```

:::
