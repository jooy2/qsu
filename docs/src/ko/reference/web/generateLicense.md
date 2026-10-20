# generateLicense

저작권자와 연도를 받아 저작권 문구를 채운 소프트웨어 라이선스 텍스트를 반환합니다.

짧은 허용형 라이선스는 전문을 반환하므로 그대로 `LICENSE` 파일로 저장할 수 있습니다. Apache 2.0, MPL 2.0, GNU 라이선스는 전문이 너무 길어서, 각 라이선스가 소스 파일 맨 위에 붙이라고 안내하는 고지문을 같은 저작권 문구 아래에 붙여 반환합니다. 이 라이선스들의 전문은 따로 `LICENSE` 파일에 두어야 합니다.

| `type`     | 라이선스                                        | SPDX 식별자         | 반환 형태   |
| ---------- | ----------------------------------------------- | ------------------- | ----------- |
| `mit`      | MIT License                                     | `MIT`               | 전문        |
| `isc`      | ISC License                                     | `ISC`               | 전문        |
| `bsd2`     | BSD 2-Clause License                            | `BSD-2-Clause`      | 전문        |
| `bsd3`     | BSD 3-Clause License                            | `BSD-3-Clause`      | 전문        |
| `apache20` | Apache License 2.0                              | `Apache-2.0`        | 파일 고지문 |
| `mpl20`    | Mozilla Public License 2.0                      | `MPL-2.0`           | 파일 고지문 |
| `gpl3`     | GNU General Public License v3.0 or later        | `GPL-3.0-or-later`  | 파일 고지문 |
| `lgpl3`    | GNU Lesser General Public License v3.0 or later | `LGPL-3.0-or-later` | 파일 고지문 |
| `agpl3`    | GNU Affero General Public License v3.0 or later | `AGPL-3.0-or-later` | 파일 고지문 |

`type`에는 두 열 중 어느 값을 넣어도 되고, 대소문자와 문장부호는 무시하므로 `Apache 2.0`이나 `bsd-3`도 됩니다. 그 밖의 값은 다른 라이선스로 대신하지 않고 <Val js="RangeError" dart="ArgumentError" python="ValueError" />를 던집니다. GNU 고지문은 이후 버전의 라이선스도 쓸 수 있다고 적고 있어서 `-or-later` 식별자만 받습니다. `GPL-3.0`은 `GPL-3.0-only`를 뜻하던 SPDX의 옛 이름입니다.

FSF는 GNU 고지문 위에 프로그램 이름과 하는 일을 적은 한 줄을 두라고 권합니다. 필요하면 결과 앞에 직접 붙이면 됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'options', type: 'LicenseOption', required: true, named: true, desc: '아래 표를 참고하세요.' }
]" />

<ParamsTable name="LicenseOption" :rows="[
	{ name: 'type', type: { js: 'LicenseType', dart: 'String', python: 'str' }, required: true, desc: '반환할 라이선스입니다. 위 표의 값을 씁니다.' },
	{ name: 'author', type: 'string', required: true, desc: '저작권자입니다. 개인이나 단체의 이름을 씁니다.' },
	{ name: 'email', type: 'string', desc: '저작권자 뒤에 `<email>` 형태로 붙습니다.' },
	{ name: 'yearStart', type: { js: 'string | number', dart: 'Object', python: 'str | int' }, desc: '저작권이 시작된 연도입니다. 기본값은 올해입니다.' },
	{ name: 'yearEnd', type: { js: 'string | number', dart: 'Object', python: 'str | int' }, desc: '마지막 연도이며 `yearStart-yearEnd` 형태로 씁니다. `yearStart`와 같으면 생략합니다.' },
	{ name: 'htmlBr', type: 'boolean', default: 'false', desc: 'HTML에 넣을 수 있도록 줄바꿈 대신 `<br/>`로 줄을 나눕니다. 이때 `&`, `<`, `>`도 이스케이프하므로 꺾쇠괄호로 감싼 이메일 주소가 태그로 읽히지 않습니다.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
generateLicense({
	type: 'mit',
	author: 'example',
	email: 'example@example.com',
	yearStart: 2020,
	yearEnd: 2026
}); // Returns 'Copyright (c) 2020-2026 example <example@example.com>\n\nPermission is hereby granted, ...'
generateLicense({ type: 'Apache-2.0', author: 'example', yearStart: 2026 }); // Returns 'Copyright 2026 example\n\nLicensed under the Apache License, Version 2.0 ...'
generateLicense({ type: 'gpl3', author: 'example' }); // Returns 'Copyright (C) <this year> example\n\nThis program is free software: ...'
generateLicense({ type: 'gpl-2', author: 'example' }); // Throws a RangeError
```

:::

::: lang dart

```dart
generateLicense(
  type: 'mit',
  author: 'example',
  email: 'example@example.com',
  yearStart: 2020,
  yearEnd: 2026,
); // Returns 'Copyright (c) 2020-2026 example <example@example.com>\n\nPermission is hereby granted, ...'
generateLicense(type: 'Apache-2.0', author: 'example', yearStart: 2026); // Returns 'Copyright 2026 example\n\nLicensed under the Apache License, Version 2.0 ...'
generateLicense(type: 'gpl3', author: 'example'); // Returns 'Copyright (C) <this year> example\n\nThis program is free software: ...'
generateLicense(type: 'gpl-2', author: 'example'); // Throws an ArgumentError
```

:::

::: lang python

```python
generateLicense(
	type='mit',
	author='example',
	email='example@example.com',
	yearStart=2020,
	yearEnd=2026
)  # Returns 'Copyright (c) 2020-2026 example <example@example.com>\n\nPermission is hereby granted, ...'
generateLicense(type='Apache-2.0', author='example', yearStart=2026)  # Returns 'Copyright 2026 example\n\nLicensed under the Apache License, Version 2.0 ...'
generateLicense(type='gpl3', author='example')  # Returns 'Copyright (C) <this year> example\n\nThis program is free software: ...'
generateLicense(type='gpl-2', author='example')  # Raises a ValueError
```

:::
