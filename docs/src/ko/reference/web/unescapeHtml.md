# unescapeHtml <Lang js dart python />

[escapeHtml](./escapeHtml)이 만들어내는 다섯 개의 HTML 엔티티를 원래 문자로 되돌립니다.

| 엔티티 | 변환 결과 |
| --- | --- |
| `&amp;` | `&` |
| `&lt;` | `<` |
| `&gt;` | `>` |
| `&quot;` | `"` |
| `&#39;` | `'` |

문자열을 다섯 번 연속 치환하지 않고 **한 번만** 순회합니다. `&amp;`를 먼저 `&`로 바꾸고 나서 `&lt;`를 `<`로 바꾸면 `&amp;lt;`가 `<`로 해석되지만, 실제로는 `&lt;`라는 문자열 그대로 복원되어야 하기 때문입니다.

이 다섯 개만 인식하므로 `&apos;`, `&nbsp;`, `&#x27;` 같은 다른 엔티티나 숫자 엔티티는 그대로 남습니다. 따라서 `unescapeHtml(escapeHtml(text))`는 항상 원래 문자열을 돌려줍니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '되돌릴 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
unescapeHtml('fred, barney, &amp; pebbles'); // Returns 'fred, barney, & pebbles'
unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'); // Returns '<script>alert("x")</script>'
unescapeHtml('it&#39;s'); // Returns "it's"
unescapeHtml('&amp;lt;'); // Returns '&lt;'
unescapeHtml('&nbsp;'); // Returns '&nbsp;'
```

```dart [Dart]
unescapeHtml('fred, barney, &amp; pebbles'); // Returns 'fred, barney, & pebbles'
unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'); // Returns '<script>alert("x")</script>'
unescapeHtml('it&#39;s'); // Returns "it's"
unescapeHtml('&amp;lt;'); // Returns '&lt;'
unescapeHtml('&nbsp;'); // Returns '&nbsp;'
```

```python [Python]
unescapeHtml('fred, barney, &amp; pebbles')  # Returns 'fred, barney, & pebbles'
unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;')  # Returns '<script>alert("x")</script>'
unescapeHtml('it&#39;s')  # Returns "it's"
unescapeHtml('&amp;lt;')  # Returns '&lt;'
unescapeHtml('&nbsp;')  # Returns '&nbsp;'
```

:::
