# capitalizeEachSentence

모든 문장의 첫 글자를 대문자로 표기합니다. 일반적으로 문장을 구분하는 `.` 문자를 사용하지만, `separator` 인수의 값을 통해 사용자 정의할 수 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true },
	{ name: 'separator', type: 'string', named: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
capitalizeEachSentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEachSentence('hello!world', '!'); // Returns 'Hello!World'
```

:::

::: lang dart

```dart
capitalizeEachSentence('hello. world. hi.'); // Returns 'Hello. World. Hi.'
capitalizeEachSentence('hello!world', separator: '!'); // Returns 'Hello!World'
```

:::

::: lang python

```python
capitalizeEachSentence('hello. world. hi.')  # Returns 'Hello. World. Hi.'
capitalizeEachSentence('hello!world', '!')  # Returns 'Hello!World'
```

:::
