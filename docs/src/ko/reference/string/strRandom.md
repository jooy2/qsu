# strRandom <Lang dart js python />

주어진 길이의 숫자 또는 대문자와 소문자를 포함하는 임의의 문자열을 반환합니다. `length`가 0 이하이면 빈 문자열을 반환합니다.

이 함수에서 생성되는 무작위 문자열은 고유성을 보장하지 않으므로 고유 ID를 생성하거나 보안 작업에 활용해서는 안됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'length', type: 'number', required: true },
	{ name: 'additionalCharacters', type: 'string', named: true }
]" />

## Returns

> string

## Examples

::: lang js

```javascript
strRandom(5); // Returns 'CHy2M'
```

:::

::: lang dart

```dart
strRandom(5); // Returns 'CHy2M'
```

:::

::: lang python

```python
strRandom(5)  # Returns 'CHy2M'
```

:::
