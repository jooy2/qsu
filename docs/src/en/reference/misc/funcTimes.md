# funcTimes
Repeat iteratee n (times argument value) times. After the return result of each function is stored in the array in order, the final array is returned.

## Parameters

<ParamsTable :rows="[
	{ name: 'times', type: 'number', required: true },
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

funcTimes(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
funcTimes(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

:::

::: lang dart

```dart
String sayHi(str) {
  return 'Hi${str || ''}';
}

funcTimes(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
funcTimes(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

:::

::: lang python

```python
def sayHi(str=None):
	return f"Hi{str or ''}"

funcTimes(3, sayHi)  # Returns ['Hi', 'Hi', 'Hi']
funcTimes(4, lambda: sayHi('!'))  # Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

:::
