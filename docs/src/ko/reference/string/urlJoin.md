# urlJoin
주어진 문자열 인수를 첫 번째 인수(URL의 시작)와 합쳐서 슬래시(/) 기호가 올바르게 포함되도록 연결합니다.

::: lang dart

조각들은 각각의 인자가 아니라 List 하나로 전달합니다.

:::

## Parameters

<ParamsTable :rows="[
	{ name: 'args', type: { js: '...any[]', dart: 'List<String?>' }, required: true, desc: { js: '연결할 URL 조각들입니다. 각각의 인자로 전달합니다.', dart: '연결할 URL 조각들입니다. List 하나로 전달합니다.' } }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
urlJoin('https://example.com', 'hello', 'world'); // Returns 'https://example.com/hello/world'
```

:::

::: lang dart

```dart
urlJoin(['https://example.com', 'hello', 'world']); // Returns 'https://example.com/hello/world'
```

:::

::: lang python

```python
urlJoin('https://example.com', 'hello', 'world')  # Returns 'https://example.com/hello/world'
```

:::
