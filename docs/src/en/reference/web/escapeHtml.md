# escapeHtml <Lang js dart python />

Escapes the five characters that carry meaning in HTML, so a value can be dropped into a page as text rather than read as markup.

| Character | Becomes |
| --- | --- |
| `&` | `&amp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `"` | `&quot;` |
| `'` | `&#39;` |

`'` is written as `&#39;` rather than `&apos;`, which HTML 4 never defined and which therefore does not survive every parser. Python's built-in `html.escape` writes `&#x27;` instead, so this function is not a wrapper around it.

Everything else is left alone, so text and emoji pass through untouched. `&` is part of the escaped set, which means an already-escaped string is escaped again: `escapeHtml('&lt;')` returns `'&amp;lt;'`.

[unescapeHtml](./unescapeHtml) turns the result back.

## Parameters

<ParamsTable :rows="[
	{ name: 'text', type: 'string', required: true, desc: 'The string to escape. An empty or missing value returns an empty string.' }
]" />

## Returns

> string

## Examples

::: code-group

```javascript [JavaScript]
escapeHtml('fred, barney, & pebbles'); // Returns 'fred, barney, &amp; pebbles'
escapeHtml('<script>alert("x")</script>'); // Returns '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
escapeHtml("it's"); // Returns 'it&#39;s'
escapeHtml('&lt;'); // Returns '&amp;lt;'
```

```dart [Dart]
escapeHtml('fred, barney, & pebbles'); // Returns 'fred, barney, &amp; pebbles'
escapeHtml('<script>alert("x")</script>'); // Returns '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
escapeHtml("it's"); // Returns 'it&#39;s'
escapeHtml('&lt;'); // Returns '&amp;lt;'
```

```python [Python]
escapeHtml('fred, barney, & pebbles')  # Returns 'fred, barney, &amp; pebbles'
escapeHtml('<script>alert("x")</script>')  # Returns '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
escapeHtml("it's")  # Returns 'it&#39;s'
escapeHtml('&lt;')  # Returns '&amp;lt;'
```

:::
