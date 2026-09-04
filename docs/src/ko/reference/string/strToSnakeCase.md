# strToSnakeCase <Lang js dart python />

문자열을 `snake_case`로 변환합니다. 모든 단어를 소문자로 바꾼 뒤 밑줄(`_`)로 이어 붙입니다.

문자열은 [words](./words)로 나누므로 공백·구두점·`-`·`_`가 모두 구분자로 처리되고, camelCase 경계에서 나뉘며, 약어는 뒤따르는 단어와 분리되고(`XMLHttpRequest` → `xml_http_request`), 연속된 숫자는 하나의 단어가 됩니다(`abc12def` → `abc_12_def`).

대소문자 구분이 없는 문자는 글자 자체는 그대로 유지되지만 단어 분리에는 그대로 참여하므로, `한글English혼합`은 `한글_english_혼합`이 됩니다.

[strToCamelCase](./strToCamelCase), [strToPascalCase](./strToPascalCase), [strToKebabCase](./strToKebabCase), [strToConstantCase](./strToConstantCase)와 짝을 이룹니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '변환할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
strToSnakeCase('foo bar'); // Returns 'foo_bar'
strToSnakeCase('--foo-bar--'); // Returns 'foo_bar'
strToSnakeCase('camelCase'); // Returns 'camel_case'
strToSnakeCase('XMLHttpRequest'); // Returns 'xml_http_request'
strToSnakeCase('abc12def'); // Returns 'abc_12_def'
```

:::

::: lang dart

```dart
strToSnakeCase('foo bar'); // Returns 'foo_bar'
strToSnakeCase('--foo-bar--'); // Returns 'foo_bar'
strToSnakeCase('camelCase'); // Returns 'camel_case'
strToSnakeCase('XMLHttpRequest'); // Returns 'xml_http_request'
strToSnakeCase('abc12def'); // Returns 'abc_12_def'
```

:::

::: lang python

```python
strToSnakeCase('foo bar')  # Returns 'foo_bar'
strToSnakeCase('--foo-bar--')  # Returns 'foo_bar'
strToSnakeCase('camelCase')  # Returns 'camel_case'
strToSnakeCase('XMLHttpRequest')  # Returns 'xml_http_request'
strToSnakeCase('abc12def')  # Returns 'abc_12_def'
```

:::
