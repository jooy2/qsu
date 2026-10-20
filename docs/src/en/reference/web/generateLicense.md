# generateLicense

Returns the text of a software license with the copyright line filled in from the author and the years you give.

The short permissive licenses are returned whole, ready to be saved as a `LICENSE` file. Apache 2.0, MPL 2.0 and the GNU licenses are too long for that, so they are returned as the notice their own text asks you to put at the top of each source file, under the same copyright line. Keep the full text of those licenses in a `LICENSE` file beside it.

| `type`     | License                                         | SPDX identifier     | Returned as |
| ---------- | ----------------------------------------------- | ------------------- | ----------- |
| `mit`      | MIT License                                     | `MIT`               | Full text   |
| `isc`      | ISC License                                     | `ISC`               | Full text   |
| `bsd2`     | BSD 2-Clause License                            | `BSD-2-Clause`      | Full text   |
| `bsd3`     | BSD 3-Clause License                            | `BSD-3-Clause`      | Full text   |
| `apache20` | Apache License 2.0                              | `Apache-2.0`        | File notice |
| `mpl20`    | Mozilla Public License 2.0                      | `MPL-2.0`           | File notice |
| `gpl3`     | GNU General Public License v3.0 or later        | `GPL-3.0-or-later`  | File notice |
| `lgpl3`    | GNU Lesser General Public License v3.0 or later | `LGPL-3.0-or-later` | File notice |
| `agpl3`    | GNU Affero General Public License v3.0 or later | `AGPL-3.0-or-later` | File notice |

`type` takes either column and is matched without case or punctuation, so `Apache 2.0` and `bsd-3` work as well. Any other value throws a <Val js="RangeError" dart="ArgumentError" python="ValueError" /> rather than falling back to another license. The GNU notices let the reader use any later version of the license, so only the `-or-later` identifiers are accepted; `GPL-3.0` is the deprecated SPDX name for `GPL-3.0-only`.

The FSF suggests putting a line with the program's name and what it does above the GNU notice. Add it to the result yourself when you want it.

## Parameters

<ParamsTable :rows="[
	{ name: 'options', type: 'LicenseOption', required: true, named: true, desc: 'See the table below.' }
]" />

<ParamsTable name="LicenseOption" :rows="[
	{ name: 'type', type: { js: 'LicenseType', dart: 'String', python: 'str' }, required: true, desc: 'The license to return, from the table above.' },
	{ name: 'author', type: 'string', required: true, desc: 'The copyright holder, a person or an organization.' },
	{ name: 'email', type: 'string', desc: 'Written after the author as `<email>`.' },
	{ name: 'yearStart', type: { js: 'string | number', dart: 'Object', python: 'str | int' }, desc: 'The first year of the copyright. Defaults to the current year.' },
	{ name: 'yearEnd', type: { js: 'string | number', dart: 'Object', python: 'str | int' }, desc: 'The last year, written as `yearStart-yearEnd`. Left out when it is the same as `yearStart`.' },
	{ name: 'htmlBr', type: 'boolean', default: 'false', desc: 'Separate the lines with `<br/>` instead of a newline, for putting the text into HTML. `&`, `<` and `>` are escaped as well, so an email address in angle brackets is not read as a tag.' }
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
