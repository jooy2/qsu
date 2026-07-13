# generateLicense <Lang js python />

Returns text in a specific license format based on the author information of the given argument. The argument uses the Object type.

## Parameters

<ParamsTable :rows="[
	{ name: 'options', type: 'LicenseOption', required: true }
]" />

<ParamsTable name="LicenseOption" :rows="[
	{ name: 'author', type: 'string', required: true },
	{ name: 'email', type: 'string' },
	{ name: 'yearStart', type: 'string | number', required: true },
	{ name: 'yearEnd', type: 'string' },
	{ name: 'htmlBr', type: 'boolean' },
	{ name: 'type', type: `'mit' | 'apache20' | 'bsd3'`, required: true }
]" />

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

```python [Python]
generateLicense(
	type='mit',
	author='example',
	email='example@example.com',
	yearStart=2020,
	yearEnd=2021,
	htmlBr=True
)
```
