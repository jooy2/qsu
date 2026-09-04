# numUnique
현재 시각을 기반으로 한 고유의 숫자를 반환합니다.

밀리초 타임스탬프에 밀리초 단위 일련번호를 결합하므로, 같은 프로세스 안에서 반복 호출해도 항상 이전보다 큰 새로운 값을 반환합니다.

::: warning
고유성은 **하나의 프로세스 안에서만** 보장됩니다. 서로 다른 프로세스가 같은 밀리초에 호출하면 동일한 값이 나올 수 있으므로, 여러 서버에 걸친 기본 키로 사용하면 안 됩니다. 값이 순차적이라 예측 가능하므로 토큰이나 세션 ID 등 보안 용도로는 절대 사용하지 마세요.
:::

## Parameters

No parameters required

## Returns

<ReturnType type="number" />

## Examples

::: lang js

```javascript
numUnique(); // Returns 1785202877818000
numUnique(); // Returns 1785202877818001
```

:::

::: lang dart

```dart
numUnique(); // Returns 1785202877818000
numUnique(); // Returns 1785202877818001
```

:::

::: lang python

```python
numUnique() # Returns 1785202877818000
numUnique() # Returns 1785202877818001
```

:::
