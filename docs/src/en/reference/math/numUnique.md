# numUnique <Lang dart js python />

Returns a unique number based on the current timestamp.

The value is a millisecond timestamp combined with a per-millisecond sequence, so repeated calls within the same process always return a new, strictly increasing number.

::: warning
Uniqueness is only guaranteed within a single process. Two processes calling this in the same millisecond can produce the same value, so do not use it as a primary key across machines. The value is sequential and therefore predictable — never use it for tokens, session ids or anything security related.

In Python the value still combines a timestamp with a random number and is 18 digits long, so it can collide. That implementation will be aligned with the others in a future release.
:::

## Parameters

No parameters required

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
numUnique(); // Returns 1785202877818000
numUnique(); // Returns 1785202877818001
```

```dart [Dart]
numUnique(); // Returns 1785202877818000
numUnique(); // Returns 1785202877818001
```

```python [Python]
numUnique() # Returns 177052123219057200
```

:::
