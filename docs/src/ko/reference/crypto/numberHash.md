# numberHash
<NodeRequired ko />

지정된 문자열을 숫자형 해시값으로 반환합니다. 반환값은 음수일 수도 있습니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'str', type: 'string', required: true }
]" />

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
numberHash('abc'); // Returns 96354
numberHash('Hello'); // Returns 69609650
numberHash('hello'); // Returns 99162322
```

:::

::: lang dart

```dart
numberHash('abc'); // Returns 96354
numberHash('Hello'); // Returns 69609650
numberHash('hello'); // Returns 99162322
```

:::

::: lang python

```python
numberHash('abc')  # Returns 96354
numberHash('Hello')  # Returns 69609650
numberHash('hello')  # Returns 99162322
```

:::
