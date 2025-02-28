# generateLicense <Badge type="tip" text="JavaScript" />

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

## Parameters

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20' }`

## Returns

> string

## Examples

```javascript
generateLicense({
	holder: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2021,
	htmlBr: true
});
```
