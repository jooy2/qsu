# strToPascalCase <Lang js dart python />

문자열을 `PascalCase`로 변환합니다. 모든 단어의 첫 글자를 대문자로, 나머지를 소문자로 바꾼 뒤 구분자를 모두 제거하여 이어 붙입니다.

문자열은 [words](./words)로 나누므로 공백·구두점·`-`·`_`가 모두 구분자로 처리되고, camelCase 경계에서 나뉘며, 약어는 뒤따르는 단어와 분리되고(`XMLHttpRequest` → `XmlHttpRequest`), 연속된 숫자는 하나의 단어가 됩니다(`abc12def` → `Abc12Def`).

대소문자 구분이 없는 문자는 그대로 유지되므로 `한글English혼합`은 변하지 않습니다.

[strToCamelCase](./strToCamelCase)에서 첫 단어까지 대문자로 시작하게 한 것과 같습니다. 원래 구분자를 유지한 채 각 단어의 첫 글자만 바꾸는 [capitalizeEachWords](./capitalizeEachWords)와는 다릅니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '변환할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
strToPascalCase('foo bar'); // Returns 'FooBar'
strToPascalCase('--foo-bar--'); // Returns 'FooBar'
strToPascalCase('camelCase'); // Returns 'CamelCase'
strToPascalCase('XMLHttpRequest'); // Returns 'XmlHttpRequest'
strToPascalCase('abc12def'); // Returns 'Abc12Def'
```

:::

::: lang dart

```dart
strToPascalCase('foo bar'); // Returns 'FooBar'
strToPascalCase('--foo-bar--'); // Returns 'FooBar'
strToPascalCase('camelCase'); // Returns 'CamelCase'
strToPascalCase('XMLHttpRequest'); // Returns 'XmlHttpRequest'
strToPascalCase('abc12def'); // Returns 'Abc12Def'
```

:::

::: lang python

```python
strToPascalCase('foo bar')  # Returns 'FooBar'
strToPascalCase('--foo-bar--')  # Returns 'FooBar'
strToPascalCase('camelCase')  # Returns 'CamelCase'
strToPascalCase('XMLHttpRequest')  # Returns 'XmlHttpRequest'
strToPascalCase('abc12def')  # Returns 'Abc12Def'
```

:::
