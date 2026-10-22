# collapseWhitespace

Removes all whitespace before and after a string. Unlike JavaScript's `trim` function, it converts two or more spaces between sentences into a single space.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'string | null', dart: 'String' }" />

## Examples

::: lang js

```javascript
collapseWhitespace(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
collapseWhitespace('H e l l o     World'); // Returns 'H e l l o World'
```

:::

::: lang dart

```dart
collapseWhitespace(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
collapseWhitespace('H e l l o     World'); // Returns 'H e l l o World'
```

:::

::: lang python

```python
collapseWhitespace(' Hello Wor  ld  ')  # Returns 'Hello Wor ld'
collapseWhitespace('H e l l o     World')  # Returns 'H e l l o World'
```

:::
