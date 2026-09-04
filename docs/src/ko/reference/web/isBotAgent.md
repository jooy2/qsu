# isBotAgent <Lang js dart python />

사용자 에이전트 값을 분석하여 검색 엔진의 봇인지 확인합니다. 봇인 경우 `true`를 반환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'userAgent', type: 'string', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

:::

::: lang dart

```dart
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'); // Returns true
```

:::

::: lang python

```python
isBotAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')  # Returns True
```

:::
