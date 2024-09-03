---
title: String
order: 3
---

# API: String

## `capitalizeFirst`

Converts the first letter of the entire string to uppercase and returns.

### Parameters

- `str::string`

### Returns

> string

### Examples

```dart
capitalizeFirst('abcd'); // Returns 'Abcd'
```

## `truncate`

Truncates a long string to a specified length, optionally appending an ellipsis after the string.

### Parameters

- `str::string`
- `length::number`

### Optional Parameters

- `ellipsis::string || ''`

### Returns

> string

### Examples

```dart
truncate('hello', 3); // Returns 'hel'
truncate('hello', 2, ellipsis: '...'); // Returns 'he...'
```
