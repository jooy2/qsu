# split <Lang js />

Splits a string based on the specified character and returns it as an Array. Unlike the existing split, it splits the values provided as multiple parameters (array or multiple arguments) at once.

## Parameters

- `str::string`
- `splitter::string||string[]||...string`

## Returns

> string[]

## Examples

```javascript
split('hello% js world', '% '); // Returns ['hello', 'js world']
split('hello,js,world', ','); // Returns ['hello', 'js', 'world']
split('hello%js,world', ',', '%'); // Returns ['hello', 'js', 'world']
split('hello%js,world', [',', '%']); // Returns ['hello', 'js', 'world']
```
