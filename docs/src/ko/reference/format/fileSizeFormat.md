# fileSizeFormat
주어진 파일 크기(바이트)를 사람이 읽기 쉬운 문자열로 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'bytes', type: { js: 'number', python: 'float' }, required: true, desc: 'Converts it to a human-friendly string via the bytes provided here.' },
	{ name: 'decimals', type: 'number', default: '2', named: true, desc: 'Specifies the number of decimal places to represent.' },
	{ name: 'ceil', type: 'boolean', default: 'false', named: true, desc: '이 값이 `true`이면 소수점을 제거하고 올림합니다.' },
	{ name: 'options', type: 'FileSizeOptions', named: true, desc: { js: '아래 표를 참고하세요. JavaScript는 `decimals`와 `ceil` 뒤에 네 번째 객체 인자로 받습니다.', dart: '아래 표를 참고하세요.', python: '아래 표를 참고하세요.' } }
]" />

<ParamsTable name="FileSizeOptions" :rows="[
	{ name: 'standard', type: `'jedec' | 'iec' | 'si'`, default: `'jedec'`, desc: '어떤 수로 나누고 어떤 단위 이름을 쓸지 정합니다. 아래 표를 참고하세요.' },
	{ name: 'unitDisplay', type: `'short' | 'long'`, default: `'short'`, desc: '단위를 약어(`MB`)로 쓸지 전체 단어(`Megabytes`)로 쓸지 정합니다. 전체 단어는 반올림한 수가 1일 때 단수형이 됩니다.' }
]" />

두 옵션을 모두 생략하면 이 함수가 지금까지 반환하던 문자열이 그대로 나옵니다.

## Standards

| `standard` | 나누는 수 | 단위                | `1000000`의 결과 |
| ---------- | --------- | ------------------- | ---------------- |
| `jedec`    | 1024      | `KB`, `MB`, `GB`    | `976.56 KB`      |
| `iec`      | 1024      | `KiB`, `MiB`, `GiB` | `976.56 KiB`     |
| `si`       | 1000      | `kB`, `MB`, `GB`    | `1 MB`           |

`jedec`이 기본값인 이유는 이 함수가 지금까지 그렇게 해 왔기 때문입니다. 1024로 나누고 `KB`라고 씁니다. `iec`은 똑같이 1024로 나누되 실제로 1024를 뜻하는 접두사를 쓰고, `si`는 디스크 제조사가 쓰는 십진 단위입니다. 수와 단위를 일치시켜야 한다면 `iec`이나 `si`를 고르세요.

지수가 0인 단위에는 접두사가 붙지 않으므로 세 표준 모두 `Bytes`입니다.

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, 3); // '95.367 MB'
fileSizeFormat(100000000, 0, true); // '96 MB'

fileSizeFormat(1000000, 2, false, { standard: 'iec' }); // '976.56 KiB'
fileSizeFormat(1000000, 2, false, { standard: 'si' }); // '1 MB'
fileSizeFormat(1048576, 2, false, { unitDisplay: 'long' }); // '1 Megabyte'
fileSizeFormat(1234567, 2, false, { unitDisplay: 'long' }); // '1.18 Megabytes'
```

:::

::: lang dart

```dart
fileSizeFormat(1000000); // '976.56 KB'
fileSizeFormat(100000000, decimals: 3); // '95.367 MB'
fileSizeFormat(100000000, ceil: true); // '96 MB'

fileSizeFormat(1000000, standard: 'iec'); // '976.56 KiB'
fileSizeFormat(1000000, standard: 'si'); // '1 MB'
fileSizeFormat(1048576, unitDisplay: 'long'); // '1 Megabyte'
fileSizeFormat(1234567, unitDisplay: 'long'); // '1.18 Megabytes'
```

:::

::: lang python

```python
fileSizeFormat(1000000)  # '976.56 KB'
fileSizeFormat(100000000, 3)  # '95.367 MB'
fileSizeFormat(100000000, 0, True)  # '96 MB'

fileSizeFormat(1000000, standard='iec')  # '976.56 KiB'
fileSizeFormat(1000000, standard='si')  # '1 MB'
fileSizeFormat(1048576, unitDisplay='long')  # '1 Megabyte'
fileSizeFormat(1234567, unitDisplay='long')  # '1.18 Megabytes'
```

:::

## 다른 언어로 크기 쓰기

위의 단위 이름은 영어이고 이 함수는 번역하지 않습니다. 읽는 사람의 언어로 크기를 보여 주려면 [fileSizeParts](/ko/reference/format/fileSizeParts)로 수와 단위를 나눈 다음, 로케일을 아는 포매터에 넘기세요.
