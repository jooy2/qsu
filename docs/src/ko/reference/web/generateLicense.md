# generateLicense <Lang js python />

지정된 인수의 저자 정보를 기반으로 특정 라이선스 형식으로 텍스트를 반환합니다. 인수는 Object 유형을 사용합니다.

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
