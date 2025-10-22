# generateLicense <Lang js />

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

## Parameters

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20 | 'bsd3' }`

## Returns

> string

## Examples

```javascript
generateLicense({
	type: 'mit',
	holder: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2021,
	htmlBr: true
});
```
