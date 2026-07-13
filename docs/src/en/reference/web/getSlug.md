# getSlug <Lang js dart python />

Converts a string into a URL-friendly slug. The input is trimmed, split into words on whitespace and any existing `-`/`_` characters, and joined back together with the chosen separator. Letters are kept, while non-Latin letters, digits and special characters are gated by the options below.

The behavior is intentionally simple and predictable:

- The result is lowercased by default (or uppercased when `uppercase` is set).
- Only whitespace and `-`/`_` act as word boundaries. Other dropped characters (such as `@` or `.`) simply disappear, so the characters around them merge into a single word.
- Non-Latin letters (for example Korean) are kept as-is by default because modern browsers can display them in a URL. Set `includeNonLatin` to `false` to keep only ASCII letters.
- Digits are included by default; special characters are excluded by default. When `includeSpecial` is enabled, each special character is percent-encoded (for example `&` becomes `%26`).
- When `baseUrl` is provided and the slug is not empty, the slug is appended to it to form a full URL. A trailing slash on the base URL is normalized away.
- An empty input (or one that produces no slug) returns an empty string, even when a `baseUrl` is set.

## Parameters

- `text::string`
- `options::object` (optional)
  - `separator::string` - The word separator. Default: `-`
  - `includeNumbers::boolean` - Keep digits. Default: `true`
  - `includeSpecial::boolean` - Percent-encode and keep special characters. Default: `false`
  - `uppercase::boolean` - Output in uppercase instead of lowercase. Default: `false`
  - `includeNonLatin::boolean` - Keep non-Latin letters such as Korean. Default: `true`
  - `baseUrl::string` - When set, prepend this base URL to build a full URL. Default: `''`

In Dart, the options are named parameters. In Python, they are keyword arguments.

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
