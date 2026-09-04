# words <Lang dart js python />

문자열을 구성하는 단어들로 나누어 배열로 반환합니다.

문자와 숫자가 아닌 모든 문자는 단어를 구분하는 역할을 하므로, 공백·구두점·`-`·`_`는 모두 구분자로 처리되어 결과에 포함되지 않습니다. 여기에 더해 다음 규칙이 적용됩니다.

- 연속된 숫자는 하나의 단어가 됩니다. `'abc12def'` → `['abc', '12', 'def']`
- camelCase와 PascalCase 경계에서 나뉩니다. `'camelCase'` → `['camel', 'Case']`
- 연속된 대문자 중 마지막 대문자는 다음 단어의 시작이 되므로 약어는 그대로 유지됩니다. `'XMLHttpRequest'` → `['XML', 'Http', 'Request']`
- 대소문자 구분이 없는 문자(한글, 한자, 태국 문자 등)에는 camelCase 경계가 적용되지 않지만, 대소문자가 있는 문자가 나타나면 단어가 바뀝니다. `'한글English'` → `['한글', 'English']`
- 결합 문자(combining mark)는 앞 글자에 붙어 있는 상태로 유지되므로, 분해된 형태의 `é`가 둘로 잘리지 않습니다.

문자열을 코드 포인트 단위로 순회하기 때문에 BMP 밖의 문자도 세 언어 모두에서 온전하게 처리됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '나눌 문자열입니다. 값이 비어 있으면 빈 배열을 반환합니다.' }
]" />

## Returns

<ReturnType type="string[]" />

## Examples

::: lang js

```javascript
words('fred, barney, & pebbles'); // Returns ['fred', 'barney', 'pebbles']
words('camelCase'); // Returns ['camel', 'Case']
words('XMLHttpRequest'); // Returns ['XML', 'Http', 'Request']
words('constant_case_VALUE'); // Returns ['constant', 'case', 'VALUE']
words('abc12def'); // Returns ['abc', '12', 'def']
words('한글English혼합'); // Returns ['한글', 'English', '혼합']
```

:::

::: lang dart

```dart
words('fred, barney, & pebbles'); // Returns ['fred', 'barney', 'pebbles']
words('camelCase'); // Returns ['camel', 'Case']
words('XMLHttpRequest'); // Returns ['XML', 'Http', 'Request']
words('constant_case_VALUE'); // Returns ['constant', 'case', 'VALUE']
words('abc12def'); // Returns ['abc', '12', 'def']
words('한글English혼합'); // Returns ['한글', 'English', '혼합']
```

:::

::: lang python

```python
words('fred, barney, & pebbles')  # Returns ['fred', 'barney', 'pebbles']
words('camelCase')  # Returns ['camel', 'Case']
words('XMLHttpRequest')  # Returns ['XML', 'Http', 'Request']
words('constant_case_VALUE')  # Returns ['constant', 'case', 'VALUE']
words('abc12def')  # Returns ['abc', '12', 'def']
words('한글English혼합')  # Returns ['한글', 'English', '혼합']
```

:::
