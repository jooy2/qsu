# strToKebabCase <Lang js dart python />

문자열을 `kebab-case`로 변환합니다. 모든 단어를 소문자로 바꾼 뒤 하이픈(`-`)으로 이어 붙입니다.

문자열은 [words](./words)로 나누므로 공백·구두점·`-`·`_`가 모두 구분자로 처리되고, camelCase 경계에서 나뉘며, 약어는 뒤따르는 단어와 분리되고(`XMLHttpRequest` → `xml-http-request`), 연속된 숫자는 하나의 단어가 됩니다(`abc12def` → `abc-12-def`).

대소문자 구분이 없는 문자는 글자 자체는 그대로 유지되지만 단어 분리에는 그대로 참여하므로, `한글English혼합`은 `한글-english-혼합`이 됩니다.

이 함수는 범용 케이스 변환입니다. URL에 사용할 슬러그가 필요하다면 악센트와 비라틴 문자를 함께 처리하고 `separator` 옵션도 제공하는 [getSlug](../web/getSlug)를 사용하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '변환할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
strToKebabCase('foo bar'); // Returns 'foo-bar'
strToKebabCase('--foo-bar--'); // Returns 'foo-bar'
strToKebabCase('camelCase'); // Returns 'camel-case'
strToKebabCase('XMLHttpRequest'); // Returns 'xml-http-request'
strToKebabCase('abc12def'); // Returns 'abc-12-def'
```

:::

::: lang dart

```dart
strToKebabCase('foo bar'); // Returns 'foo-bar'
strToKebabCase('--foo-bar--'); // Returns 'foo-bar'
strToKebabCase('camelCase'); // Returns 'camel-case'
strToKebabCase('XMLHttpRequest'); // Returns 'xml-http-request'
strToKebabCase('abc12def'); // Returns 'abc-12-def'
```

:::

::: lang python

```python
strToKebabCase('foo bar')  # Returns 'foo-bar'
strToKebabCase('--foo-bar--')  # Returns 'foo-bar'
strToKebabCase('camelCase')  # Returns 'camel-case'
strToKebabCase('XMLHttpRequest')  # Returns 'xml-http-request'
strToKebabCase('abc12def')  # Returns 'abc-12-def'
```

:::
