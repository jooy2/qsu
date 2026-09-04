# unescapeHtml
Turns the five HTML entities that [escapeHtml](./escapeHtml) produces back into the characters they stand for.

| Entity | Becomes |
| --- | --- |
| `&amp;` | `&` |
| `&lt;` | `<` |
| `&gt;` | `>` |
| `&quot;` | `"` |
| `&#39;` | `'` |

The string is walked **once**, not replaced five times in a row. Turning `&amp;` into `&` first and `&lt;` into `<` afterwards would read `&amp;lt;` as `<`, where it has to come back as the literal text `&lt;`.

Only these five entities are recognised, so anything else — `&apos;`, `&nbsp;`, `&#x27;`, a numeric entity — is left exactly as it is. `unescapeHtml(escapeHtml(text))` therefore always returns the original text.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to unescape. An empty or missing value returns an empty string.' }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
unescapeHtml('fred, barney, &amp; pebbles'); // Returns 'fred, barney, & pebbles'
unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'); // Returns '<script>alert("x")</script>'
unescapeHtml('it&#39;s'); // Returns "it's"
unescapeHtml('&amp;lt;'); // Returns '&lt;'
unescapeHtml('&nbsp;'); // Returns '&nbsp;'
```

:::

::: lang dart

```dart
unescapeHtml('fred, barney, &amp; pebbles'); // Returns 'fred, barney, & pebbles'
unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'); // Returns '<script>alert("x")</script>'
unescapeHtml('it&#39;s'); // Returns "it's"
unescapeHtml('&amp;lt;'); // Returns '&lt;'
unescapeHtml('&nbsp;'); // Returns '&nbsp;'
```

:::

::: lang python

```python
unescapeHtml('fred, barney, &amp; pebbles')  # Returns 'fred, barney, & pebbles'
unescapeHtml('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;')  # Returns '<script>alert("x")</script>'
unescapeHtml('it&#39;s')  # Returns "it's"
unescapeHtml('&amp;lt;')  # Returns '&lt;'
unescapeHtml('&nbsp;')  # Returns '&nbsp;'
```

:::
