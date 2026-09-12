# fileSizeParts
파일 크기(바이트)를 크기를 나타내는 수와 그에 맞는 단위로 나누어, 어떻게 쓸지는 호출한 쪽이 정하도록 합니다.

[fileSizeFormat](/ko/reference/format/fileSizeFormat)은 둘을 공백으로 잇고 영어 단위 이름을 붙이는데, 이 문자열은 세계 대부분에서 틀립니다. 독일어는 소수점 구분자로 쉼표를 쓰고, 프랑스어는 메가바이트를 `Mo`라고 씁니다. 이 함수는 조각을 그대로 돌려주므로, 로케일을 아는 포매터가 이어 붙이면 됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'bytes', type: { js: 'number', python: 'float' }, required: true, desc: '파일 크기(바이트)입니다.' },
	{ name: 'options', type: 'FileSizeOptions', named: true, desc: '아래 표를 참고하세요.' }
]" />

<ParamsTable name="FileSizeOptions" :rows="[
	{ name: 'standard', type: `'jedec' | 'iec' | 'si'`, default: `'jedec'`, desc: '어떤 수로 나누고 어떤 단위 이름을 쓸지 정합니다. `jedec`은 1024로 나누고 `KB`, `iec`은 1024로 나누고 `KiB`, `si`는 1000으로 나누고 `kB`라고 씁니다.' },
	{ name: 'unitDisplay', type: `'short' | 'long'`, default: `'short'`, desc: '`unit`을 약어(`MB`)로 쓸지 전체 단어(`Megabytes`)로 쓸지 정합니다. 전체 단어는 값이 1일 때 단수형이 됩니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'FileSizeParts', dart: 'FileSizeParts', python: 'dict' }" />

<ParamsTable name="FileSizeParts" :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num', python: 'float' }, desc: '`unit` 기준으로 나타낸 크기입니다. 반올림하지 **않으므로**, 이미 반올림한 수를 다시 반올림하는 대신 직접 쓰는 포매터가 한 번만 반올림합니다.' },
	{ name: 'unit', type: 'string', desc: '`value`의 단위이며, 고른 `standard`와 `unitDisplay`에 맞춰 적힙니다.' },
	{ name: 'exponent', type: 'number', desc: '표준의 밑으로 크기를 몇 번 나누었는지를 나타냅니다. `0`은 바이트, `1`은 킬로바이트, `2`는 메가바이트입니다. 직접 쓰는 단위 이름을 찾을 때 쓰세요.' }
]" />

## Examples

::: lang js

```javascript
fileSizeParts(1234567); // { value: 1.1773748397827148, unit: 'MB', exponent: 2 }
fileSizeParts(1000000, { standard: 'si' }); // { value: 1, unit: 'MB', exponent: 2 }
fileSizeParts(1048576, { standard: 'iec' }); // { value: 1, unit: 'MiB', exponent: 2 }
fileSizeParts(1048576, { unitDisplay: 'long' }); // { value: 1, unit: 'Megabyte', exponent: 2 }
```

:::

::: lang dart

```dart
final FileSizeParts parts = fileSizeParts(1234567);

parts.value; // 1.1773748397827148
parts.unit; // 'MB'
parts.exponent; // 2

fileSizeParts(1000000, standard: 'si').unit; // 'MB'
fileSizeParts(1048576, unitDisplay: 'long').unit; // 'Megabyte'
```

:::

::: lang python

```python
fileSizeParts(1234567)  # {'value': 1.1773748397827148, 'unit': 'MB', 'exponent': 2}
fileSizeParts(1000000, standard='si')  # {'value': 1.0, 'unit': 'MB', 'exponent': 2}
fileSizeParts(1048576, standard='iec')  # {'value': 1.0, 'unit': 'MiB', 'exponent': 2}
fileSizeParts(1048576, unitDisplay='long')  # {'value': 1.0, 'unit': 'Megabyte', 'exponent': 2}
```

:::

## 읽는 사람의 언어로 크기 쓰기

`exponent`를 포매터가 기대하는 단위 이름에 대응시키고, 수는 포매터가 쓰게 하세요.

::: lang js

`Intl.NumberFormat`은 단위 이름을 받아 문자열 전체를 만들며, 언어에 따라 빠지기도 하는 공백까지 처리합니다. 생성 비용이 비싸니 만들 때 쓴 인자로 캐시하세요.

```javascript
const UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte'];
const formatters = new Map();

function localizedFileSize(bytes, locale, decimals = 2) {
	const { value, exponent } = fileSizeParts(bytes, { standard: 'si' });
	const key = [locale, exponent, decimals].join('|');
	let formatter = formatters.get(key);

	if (!formatter) {
		formatter = new Intl.NumberFormat(locale, {
			style: 'unit',
			unit: UNITS[exponent],
			unitDisplay: 'short',
			maximumFractionDigits: decimals
		});

		formatters.set(key, formatter);
	}

	return formatter.format(value);
}

localizedFileSize(1234567, 'de-DE'); // '1,23 MB'
localizedFileSize(1234567, 'fr-FR'); // '1,23 Mo'
localizedFileSize(1234567, 'ko-KR'); // '1.23MB'
```

`Intl.NumberFormat`이 아는 단위는 `petabyte`까지고 그보다 크면 `RangeError`를 던지므로, 그만한 크기를 다룬다면 `UNITS`를 읽기 전에 `exponent`를 확인하세요. 이 단위 이름은 십진 기준이라 예제가 `si`를 씁니다. `jedec`이나 `iec`을 넘기면 수와 이름이 서로 맞지 않습니다.

ICU를 줄여서 빌드한 런타임은 영어 데이터만 갖고 있으며, 아무 말 없이 영어로 넘어갑니다.

:::

::: lang dart

[intl](https://pub.dev/packages/intl)을 추가해 `NumberFormat`으로 수를 쓰고, 단위 이름은 직접 가진 번역에서 붙이세요. `intl`은 수를 포맷할 뿐 단위는 다루지 않습니다.

```dart
const List<String> unitKeys = ['byte', 'kilobyte', 'megabyte', 'gigabyte'];

String localizedFileSize(int bytes, String locale) {
  final FileSizeParts parts = fileSizeParts(bytes, standard: 'si');
  final String number =
      NumberFormat.decimalPatternDigits(locale: locale, decimalDigits: 2)
          .format(parts.value);

  return '$number ${translate(unitKeys[parts.exponent])}';
}
```

:::

::: lang python

[babel](https://pypi.org/project/babel/)을 추가해 `format_decimal`로 수를 쓰고, 단위 이름은 직접 가진 번역에서 붙이세요.

```python
from babel.numbers import format_decimal

unitKeys = ['byte', 'kilobyte', 'megabyte', 'gigabyte']


def localizedFileSize(size: int, locale: str) -> str:
	parts = fileSizeParts(size, standard='si')
	number = format_decimal(parts['value'], format='#,##0.##', locale=locale)

	return f"{number} {translate(unitKeys[parts['exponent']])}"
```

:::
