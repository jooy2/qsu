# numUnique <Lang dart js python />

현재 시각을 기반으로 한 고유의 숫자를 반환합니다.

JavaScript에서는 밀리초 타임스탬프에 밀리초 단위 일련번호를 결합하므로, 같은 프로세스 안에서 반복 호출해도 항상 이전보다 큰 새로운 값을 반환합니다. `Number.MAX_SAFE_INTEGER` 범위 안이라 자릿수가 손실되지 않습니다.

::: warning
고유성은 **하나의 프로세스 안에서만** 보장됩니다. 서로 다른 프로세스가 같은 밀리초에 호출하면 동일한 값이 나올 수 있으므로, 여러 서버에 걸친 기본 키로 사용하면 안 됩니다. 값이 순차적이라 예측 가능하므로 토큰이나 세션 ID 등 보안 용도로는 절대 사용하지 마세요.

Dart와 Python은 타임스탬프와 난수를 결합한 18자리 값을 반환하므로 여전히 충돌 가능성이 있습니다. 이후 릴리스에서 JavaScript와 동일하게 맞출 예정입니다.
:::

## Parameters

No parameters required

## Returns

> number

## Examples

::: code-group

```javascript [JavaScript]
numUnique(); // Returns 1785202877818000
numUnique(); // Returns 1785202877818001
```

```dart [Dart]
numUnique(); // Returns 177052123219057200
```

```python [Python]
numUnique() # Returns 177052123219057200
```

:::
