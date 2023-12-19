---
title: Object
order: 2
---

# Methods: Object

## `_.objToQueryString`

Converts the given object data to a URL query string.

### Parameters

- `obj::object`

### Returns

> string

### Examples

```javascript
_.objToQueryString({
	hello: 'world',
	test: 1234,
	arr: [1, 2, 3]
}); // Returns 'hello=world&test=1234&arr=%5B1%2C2%2C3%5D'
```
