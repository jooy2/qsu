# funcTimes <Lang dart js python />

Repeat iteratee n (times argument value) times. After the return result of each function is stored in the array in order, the final array is returned.

## Parameters

- `times::number`
- `iteratee::function`

## Returns

> any[]

## Examples

::: code-group

```javascript [JavaScript]
function sayHi(str) {
	return `Hi${str || ''}`;
}

funcTimes(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
funcTimes(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

```dart [Dart]
String sayHi(str) {
  return 'Hi${str || ''}';
}

funcTimes(3, sayHi); // Returns ['Hi', 'Hi', 'Hi']
funcTimes(4, () => sayHi('!')); // Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

```python [Python]
def sayHi(str=None):
	return f"Hi{str or ''}"

funcTimes(3, sayHi)  # Returns ['Hi', 'Hi', 'Hi']
funcTimes(4, lambda: sayHi('!'))  # Returns ['Hi!', 'Hi!', 'Hi!', 'Hi!']
```

:::
