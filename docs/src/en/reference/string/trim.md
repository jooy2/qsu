# trim <Lang dart js />

Removes all whitespace before and after a string. Unlike JavaScript's `trim` function, it converts two or more spaces between sentences into a single space.

## Parameters

- `str::string`

## Returns

> string

## Examples

```javascript
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```
