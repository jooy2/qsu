# trim <Lang dart js python />

Removes all whitespace before and after a string. Unlike JavaScript's `trim` function, it converts two or more spaces between sentences into a single space.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

:::

::: lang dart

```dart
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

:::

::: lang python

```python
trim(' Hello Wor  ld  ')  # Returns 'Hello Wor ld'
trim('H e l l o     World')  # Returns 'H e l l o World'
```

:::
