# arrGroupBy

Groups the items of an array by the key the callback returns for each of them. The result has one entry per key, holding the items that produced it in their original order.

Keys are always strings. A number is written the way JavaScript writes it, so `1.0` becomes `'1'`, and `true`, `false` and `null` become `'true'`, `'false'` and `'null'`. Groups appear in the order their key was first seen.

To split an array into groups of a fixed size instead, use [arrGroupByMaxCount](./arrGroupByMaxCount). To count how many times each value appears, use [arrCount](./arrCount).

::: lang js

A JavaScript object always lists keys that look like integers first, in ascending order, whatever order they were added in. Groups named `'10'` and `'2'` therefore come back as `'2'` and then `'10'`.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'array', type: 'any[]', required: true, desc: 'The items to group. It is not modified.' },
	{ name: 'callback', type: { js: '(item: T) => string | number | boolean | null', dart: 'Object? Function(T item)', python: 'Callable[[Any], Any]' }, required: true, desc: 'Called once with each item. Returns the key of the group the item belongs to.' }
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
