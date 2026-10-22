# times

`iteratee`를 `count`번 실행하고, 각 실행 결과를 순서대로 담은 배열을 반환합니다. `iteratee`가 함수가 아니면 그 값을 `count`번 담습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'count', type: 'number', required: true },
	{ name: 'iteratee', type: 'function', required: true }
]" />

## Returns

<ReturnType type="any[]" />

## Examples

::: lang js

```javascript
function sayHi(str) {
	return `Hi${str || ''}`;
}

times(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
times(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

:::

::: lang dart

```dart
String sayHi(str) {
  return 'Hi${str || ''}';
}

times(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
times(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

:::

::: lang python

```python
def sayHi(str=None):
	return f"Hi{str or ''}"

times(3, sayHi)  # Returns ['Hi', 'Hi', 'Hi']
times(4, lambda: sayHi('!'))  # Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

:::
