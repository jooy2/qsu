# generateLicense <Badge type="tip" text="JavaScript" />

지정된 인수의 저자 정보를 기반으로 특정 라이선스 형식으로 텍스트를 반환합니다. 인수는 Object 유형을 사용합니다.

## Parameters

- `options::LicenseOption{ author: string, email: string?, yearStart: string|number, yearEnd: string?, htmlBr: boolean?, type: 'mit' | 'apache20' | 'bsd3' }`

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
