# escapeHtml <Lang js dart python />

HTML에서 특별한 의미를 갖는 다섯 개의 문자를 이스케이프합니다. 값이 마크업으로 해석되지 않고 텍스트로 표시되도록 할 때 사용합니다.

| 문자 | 변환 결과 |
| --- | --- |
| `&` | `&amp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `"` | `&quot;` |
| `'` | `&#39;` |

`'`는 `&apos;`가 아니라 `&#39;`로 변환합니다. `&apos;`는 HTML 4에 정의되지 않아 일부 파서에서 처리되지 않기 때문입니다. Python 내장 `html.escape`는 `&#x27;`를 사용하므로, 이 함수는 그것을 감싼 것이 아닙니다.

그 외의 문자는 건드리지 않으므로 일반 텍스트와 이모지는 그대로 통과합니다. `&`도 이스케이프 대상이므로 이미 이스케이프된 문자열은 다시 이스케이프됩니다. `escapeHtml('&lt;')`는 `'&amp;lt;'`를 반환합니다.

되돌리려면 [unescapeHtml](./unescapeHtml)을 사용하세요.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: '이스케이프할 문자열입니다. 값이 비어 있으면 빈 문자열을 반환합니다.' }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
escapeHtml('fred, barney, & pebbles'); // Returns 'fred, barney, &amp; pebbles'
escapeHtml('<script>alert("x")</script>'); // Returns '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
escapeHtml("it's"); // Returns 'it&#39;s'
escapeHtml('&lt;'); // Returns '&amp;lt;'
```

:::

::: lang dart

```dart
escapeHtml('fred, barney, & pebbles'); // Returns 'fred, barney, &amp; pebbles'
escapeHtml('<script>alert("x")</script>'); // Returns '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
escapeHtml("it's"); // Returns 'it&#39;s'
escapeHtml('&lt;'); // Returns '&amp;lt;'
```

:::

::: lang python

```python
escapeHtml('fred, barney, & pebbles')  # Returns 'fred, barney, &amp; pebbles'
escapeHtml('<script>alert("x")</script>')  # Returns '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
escapeHtml("it's")  # Returns 'it&#39;s'
escapeHtml('&lt;')  # Returns '&amp;lt;'
```

:::
