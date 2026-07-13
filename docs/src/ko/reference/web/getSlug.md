# getSlug <Lang js dart python />

문자열을 URL에 적합한 슬러그로 변환합니다. 입력값은 앞뒤 공백이 제거되고, 공백과 기존의 `-`/`_` 문자를 기준으로 단어로 분리된 뒤, 지정한 구분 기호로 다시 연결됩니다. 문자(letter)는 유지되며, 영문 외 문자, 숫자, 특수문자는 아래 옵션으로 포함 여부가 결정됩니다.

동작 방식은 의도적으로 단순하고 예측 가능합니다.

- 기본적으로 결과는 소문자로 변환됩니다(`uppercase`를 설정하면 대문자).
- 공백과 `-`/`_`만 단어 경계로 취급됩니다. 그 외에 제거되는 문자(예: `@`, `.`)는 단순히 사라지므로, 주변 문자들이 하나의 단어로 합쳐집니다.
- 영문 외 문자(예: 한글)는 최신 브라우저가 URL에서 표시할 수 있으므로 기본적으로 그대로 유지됩니다. `includeNonLatin`을 `false`로 설정하면 ASCII 알파벳만 남깁니다.
- 숫자는 기본적으로 포함되고, 특수문자는 기본적으로 제외됩니다. `includeSpecial`을 활성화하면 각 특수문자가 퍼센트 인코딩됩니다(예: `&`는 `%26`).
- `baseUrl`이 제공되고 슬러그가 비어있지 않은 경우, 슬러그를 뒤에 붙여 전체 URL을 만듭니다. 베이스 URL 끝의 슬래시(`/`)는 정규화되어 제거됩니다.
- 빈 입력(또는 슬러그가 생성되지 않는 입력)은 `baseUrl`이 설정되어 있어도 빈 문자열을 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true },
	{ name: 'options', type: 'object', named: true }
]" />

<ParamsTable name="options" :rows="[
	{ name: 'separator', type: 'string', default: `'-'`, desc: '단어 구분 기호.' },
	{ name: 'includeNumbers', type: 'boolean', default: 'true', desc: '숫자 포함.' },
	{ name: 'includeSpecial', type: 'boolean', default: 'false', desc: '특수문자를 퍼센트 인코딩하여 포함.' },
	{ name: 'uppercase', type: 'boolean', default: 'false', desc: '소문자 대신 대문자로 출력.' },
	{ name: 'includeNonLatin', type: 'boolean', default: 'true', desc: '한글 등 영문 외 문자 포함.' },
	{ name: 'baseUrl', type: 'string', default: `''`, desc: '설정 시 이 베이스 URL을 앞에 붙여 전체 URL을 생성.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
getSlug('Hello World'); // Returns 'hello-world'
getSlug('안녕 하세요 반갑습니다'); // Returns '안녕-하세요-반갑습니다'
getSlug('Product #123 (2024)'); // Returns 'product-123-2024'
getSlug('Hello World', { separator: '_', uppercase: true }); // Returns 'HELLO_WORLD'
getSlug('Café & Restaurant', { includeSpecial: true }); // Returns 'café-%26-restaurant'
getSlug('Hello 안녕', { includeNonLatin: false }); // Returns 'hello'
getSlug('Hello World', { baseUrl: 'https://example.com/blog' }); // Returns 'https://example.com/blog/hello-world'
```

```dart [Dart]
getSlug('Hello World'); // Returns 'hello-world'
getSlug('안녕 하세요 반갑습니다'); // Returns '안녕-하세요-반갑습니다'
getSlug('Product #123 (2024)'); // Returns 'product-123-2024'
getSlug('Hello World', separator: '_', uppercase: true); // Returns 'HELLO_WORLD'
getSlug('Café & Restaurant', includeSpecial: true); // Returns 'café-%26-restaurant'
getSlug('Hello 안녕', includeNonLatin: false); // Returns 'hello'
getSlug('Hello World', baseUrl: 'https://example.com/blog'); // Returns 'https://example.com/blog/hello-world'
```

```python [Python]
getSlug('Hello World')  # Returns 'hello-world'
getSlug('안녕 하세요 반갑습니다')  # Returns '안녕-하세요-반갑습니다'
getSlug('Product #123 (2024)')  # Returns 'product-123-2024'
getSlug('Hello World', separator='_', uppercase=True)  # Returns 'HELLO_WORLD'
getSlug('Café & Restaurant', includeSpecial=True)  # Returns 'café-%26-restaurant'
getSlug('Hello 안녕', includeNonLatin=False)  # Returns 'hello'
getSlug('Hello World', baseUrl='https://example.com/blog')  # Returns 'https://example.com/blog/hello-world'
```

:::
