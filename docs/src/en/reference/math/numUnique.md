# numUnique
Returns a unique number based on the current timestamp.

The value is a millisecond timestamp combined with a per-millisecond sequence, so repeated calls within the same process always return a new, strictly increasing number.

::: warning
Uniqueness is only guaranteed within a single process. Two processes calling this in the same millisecond can produce the same value, so do not use it as a primary key across machines. The value is sequential and therefore predictable — never use it for tokens, session ids or anything security related.
:::

## Parameters

No parameters required

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
numUnique(); // Returns 1785202877818000
numUnique(); // Returns 1785202877818001
```

:::

::: lang dart

```dart
numUnique(); // Returns 1785202877818000
numUnique(); // Returns 1785202877818001
```

:::

::: lang python

```python
numUnique() # Returns 1785202877818000
numUnique() # Returns 1785202877818001
```

:::
