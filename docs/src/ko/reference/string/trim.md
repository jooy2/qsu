# trim <Lang dart js python />

문자열 앞뒤의 모든 공백을 제거합니다. JavaScript의 `trim` 함수와는 달리, 문장 사이에 있는 두 개 이상의 공백을 하나의 공백으로 변환합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

<ReturnType :type="{ js: 'string | null', dart: 'String' }" />

## Examples

::: lang js

```javascript
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

:::

::: lang dart

```dart
trim(' Hello Wor  ld  '); // Returns 'Hello Wor ld'
trim('H e l l o     World'); // Returns 'H e l l o World'
```

:::

::: lang python

```python
trim(' Hello Wor  ld  ')  # Returns 'Hello Wor ld'
trim('H e l l o     World')  # Returns 'H e l l o World'
```

:::
