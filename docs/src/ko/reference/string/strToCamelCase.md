# strToCamelCase
문자열을 `camelCase`로 변환합니다. 첫 번째 단어는 모두 소문자로 바꾸고, 그 뒤의 단어는 첫 글자만 대문자로 바꾼 뒤 구분자를 모두 제거하여 이어 붙입니다.

문자열은 [words](./words)로 나누므로 공백·구두점·`-`·`_`가 모두 구분자로 처리되고, camelCase 경계에서 나뉘며, 약어는 그대로 유지되고(`XMLHttpRequest` → `xmlHttpRequest`), 연속된 숫자는 하나의 단어가 됩니다(`abc12def` → `abc12Def`).

대소문자 구분이 없는 문자는 그대로 유지되므로 `한글English혼합`은 변하지 않습니다.

[strToPascalCase](./strToPascalCase), [strToSnakeCase](./strToSnakeCase), [strToKebabCase](./strToKebabCase), [strToConstantCase](./strToConstantCase)와 짝을 이룹니다. URL에 사용할 슬러그가 필요하다면 목적이 다른 [getSlug](../web/getSlug)를 사용하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '변환할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
strToCamelCase('foo bar'); // Returns 'fooBar'
strToCamelCase('--foo-bar--'); // Returns 'fooBar'
strToCamelCase('__FOO_BAR__'); // Returns 'fooBar'
strToCamelCase('PascalCase'); // Returns 'pascalCase'
strToCamelCase('XMLHttpRequest'); // Returns 'xmlHttpRequest'
strToCamelCase('abc12def'); // Returns 'abc12Def'
```

:::

::: lang dart

```dart
strToCamelCase('foo bar'); // Returns 'fooBar'
strToCamelCase('--foo-bar--'); // Returns 'fooBar'
strToCamelCase('__FOO_BAR__'); // Returns 'fooBar'
strToCamelCase('PascalCase'); // Returns 'pascalCase'
strToCamelCase('XMLHttpRequest'); // Returns 'xmlHttpRequest'
strToCamelCase('abc12def'); // Returns 'abc12Def'
```

:::

::: lang python

```python
strToCamelCase('foo bar')  # Returns 'fooBar'
strToCamelCase('--foo-bar--')  # Returns 'fooBar'
strToCamelCase('__FOO_BAR__')  # Returns 'fooBar'
strToCamelCase('PascalCase')  # Returns 'pascalCase'
strToCamelCase('XMLHttpRequest')  # Returns 'xmlHttpRequest'
strToCamelCase('abc12def')  # Returns 'abc12Def'
```

:::
