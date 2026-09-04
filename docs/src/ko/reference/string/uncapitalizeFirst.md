# uncapitalizeFirst <Lang dart js python />

문자열의 첫 글자를 소문자로 변환하여 반환합니다. `capitalizeFirst`의 반대 동작입니다.

첫 글자만 변경하므로 나머지 문자열의 대소문자는 그대로 유지됩니다. 예를 들어 `'TEST'`는 `'tEST'`가 됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
uncapitalizeFirst('Abcd'); // Returns 'abcd'
uncapitalizeFirst('TestWords'); // Returns 'testWords'
uncapitalizeFirst('TEST'); // Returns 'tEST'
```

:::

::: lang dart

```dart
uncapitalizeFirst('Abcd'); // Returns 'abcd'
uncapitalizeFirst('TestWords'); // Returns 'testWords'
uncapitalizeFirst('TEST'); // Returns 'tEST'
```

:::

::: lang python

```python
uncapitalizeFirst('Abcd')  # Returns 'abcd'
uncapitalizeFirst('TestWords')  # Returns 'testWords'
uncapitalizeFirst('TEST')  # Returns 'tEST'
```

:::
