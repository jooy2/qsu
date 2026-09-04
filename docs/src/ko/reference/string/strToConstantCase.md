# strToConstantCase
문자열을 `CONSTANT_CASE`로 변환합니다. 모든 단어를 대문자로 바꾼 뒤 밑줄(`_`)로 이어 붙입니다.

문자열은 [words](./words)로 나누므로 공백·구두점·`-`·`_`가 모두 구분자로 처리되고, camelCase 경계에서 나뉘며, 약어는 뒤따르는 단어와 분리되고(`XMLHttpRequest` → `XML_HTTP_REQUEST`), 연속된 숫자는 하나의 단어가 됩니다(`abc12def` → `ABC_12_DEF`).

대소문자 구분이 없는 문자는 글자 자체는 그대로 유지되지만 단어 분리에는 그대로 참여하므로, `한글English혼합`은 `한글_ENGLISH_혼합`이 됩니다.

::: warning 대문자로 바꿀 때 길어지는 글자
JavaScript와 Python은 유니코드 전체 케이스 매핑(full case mapping)을, Dart는 단순 케이스 매핑(simple case mapping)을 사용합니다. 그래서 대문자로 바뀔 때 두 글자로 늘어나는 일부 문자에서 결과가 달라집니다. `straße`는 JavaScript와 Python에서 `STRASSE`가 되지만 Dart에서는 `STRAßE`가 됩니다. `ﬁ` 같은 합자도 마찬가지입니다. Dart에서 동일하게 맞추려면 유니코드 특수 케이스 매핑 표를 그대로 들고 있어야 하므로, 억지로 통일하지 않고 차이를 그대로 두었습니다.
:::

[strToSnakeCase](./strToSnakeCase)의 대문자 버전입니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '변환할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
strToConstantCase('foo bar'); // Returns 'FOO_BAR'
strToConstantCase('--foo-bar--'); // Returns 'FOO_BAR'
strToConstantCase('camelCase'); // Returns 'CAMEL_CASE'
strToConstantCase('XMLHttpRequest'); // Returns 'XML_HTTP_REQUEST'
strToConstantCase('abc12def'); // Returns 'ABC_12_DEF'
```

:::

::: lang dart

```dart
strToConstantCase('foo bar'); // Returns 'FOO_BAR'
strToConstantCase('--foo-bar--'); // Returns 'FOO_BAR'
strToConstantCase('camelCase'); // Returns 'CAMEL_CASE'
strToConstantCase('XMLHttpRequest'); // Returns 'XML_HTTP_REQUEST'
strToConstantCase('abc12def'); // Returns 'ABC_12_DEF'
```

:::

::: lang python

```python
strToConstantCase('foo bar')  # Returns 'FOO_BAR'
strToConstantCase('--foo-bar--')  # Returns 'FOO_BAR'
strToConstantCase('camelCase')  # Returns 'CAMEL_CASE'
strToConstantCase('XMLHttpRequest')  # Returns 'XML_HTTP_REQUEST'
strToConstantCase('abc12def')  # Returns 'ABC_12_DEF'
```

:::
