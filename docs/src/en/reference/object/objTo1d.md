# objTo1d <Badge type="tip" text="JavaScript" /><Badge type="info" text="Dart" />

Merges objects from the given object to the top level of the child items and displays the key names in steps, using a delimiter (`.` by default) instead of the existing keys. For example, if an object `a` has keys `b`, `c`, and `d`, the `a` key is not displayed, and the keys and values `a.b`, `a.c`, and `a.d` are displayed in the parent step.

## Parameters

- `obj::object`
- `separator::string` <span class="named">Dart:Named</span>

## Returns

> object

## Examples

```javascript
objTo1d({
	a: 1,
	b: {
		aa: 1,
		bb: 2
	},
	c: 3
});

/*
Returns:
{
	a: 1,
	'b.aa': 1,
	'b.bb': 2,
	c: 3
}
 */
```
