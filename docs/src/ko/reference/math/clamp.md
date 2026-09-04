# clamp
숫자를 지정한 범위 안으로 제한합니다. 값이 `min`보다 작으면 `min`을, `max`보다 크면 `max`를 반환하고, 범위 안에 있으면 값을 그대로 반환합니다. 최솟값과 최댓값은 범위에 포함됩니다.

최댓값을 먼저 적용하고 최솟값을 나중에 적용하기 때문에, 두 경계를 반대로 넘기면 `min`이 우선합니다. `clamp(5, 10, 1)`은 `10`을 반환합니다. Lodash도 뒤집힌 범위를 같은 방식으로 처리합니다.

Dart에는 이미 `num.clamp`가 있지만, 이 메서드는 뒤집힌 범위에서 예외를 던집니다. 세 언어에서 동일하게 동작하도록 이 함수를 별도로 제공합니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'value', type: { js: 'number', dart: 'num' }, required: true, desc: '제한할 숫자입니다.' },
	{ name: 'min', type: { js: 'number', dart: 'num' }, required: true, desc: '범위에 포함되는 최솟값입니다.' },
	{ name: 'max', type: { js: 'number', dart: 'num' }, required: true, desc: '범위에 포함되는 최댓값입니다.' }
]" />

## Returns

<ReturnType :type="{ js: 'number', dart: 'num' }" />

## Examples

::: lang js

```javascript
clamp(5, 1, 10); // Returns 5
clamp(-7, 1, 10); // Returns 1
clamp(42, 1, 10); // Returns 10
clamp(1.5, 0, 1); // Returns 1
clamp(5, 10, 1); // Returns 10 (뒤집힌 범위: `min`이 우선)
```

:::

::: lang dart

```dart
clamp(5, 1, 10); // Returns 5
clamp(-7, 1, 10); // Returns 1
clamp(42, 1, 10); // Returns 10
clamp(1.5, 0, 1); // Returns 1
clamp(5, 10, 1); // Returns 10 (뒤집힌 범위: `min`이 우선)
```

:::

::: lang python

```python
clamp(5, 1, 10)  # Returns 5
clamp(-7, 1, 10)  # Returns 1
clamp(42, 1, 10)  # Returns 10
clamp(1.5, 0, 1)  # Returns 1
clamp(5, 10, 1)  # Returns 10 (뒤집힌 범위: `min`이 우선)
```

:::
