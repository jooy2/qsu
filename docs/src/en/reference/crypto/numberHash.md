# numberHash <Lang dart js python />

<NodeRequired en />

Returns the specified string as a hash value of type number. The return value can also be negative.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

> number

## Examples

::: lang js

```javascript
numberHash('abc'); // Returns 96354
numberHash('Hello'); // Returns 69609650
numberHash('hello'); // Returns 99162322
```

:::

::: lang dart

```dart
numberHash('abc'); // Returns 96354
numberHash('Hello'); // Returns 69609650
numberHash('hello'); // Returns 99162322
```

:::

::: lang python

```python
numberHash('abc')  # Returns 96354
numberHash('Hello')  # Returns 69609650
numberHash('hello')  # Returns 99162322
```

:::
