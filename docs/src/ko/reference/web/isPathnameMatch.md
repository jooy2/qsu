# isPathnameMatch

처음 인자값의 URL 경로가 두번째 rule set에 매칭되는지 확인할 수 있습니다. 매칭 규칙은 string 또는 string으로 구성된 배열을 사용할 수 있으며, 두 인자 모두 경로는 `/`으로 시작합니다. 규칙에는 와일드카드(`*`)를 사용할 수 있습니다. 예를 들어 `user/*`인 경우 `/user`로 시작되는 페이지가 모두 해당됩니다.

## Parameters

<ParamsTable :rows="[
	{ name: 'pathname', type: 'string', required: true },
	{ name: 'matcher', type: 'string | string[]', required: true }
]" />

## Returns

<ReturnType type="boolean" />

## Examples

::: lang js

```javascript
isPathnameMatch('/user/login', '/admin'); // Returns false
isPathnameMatch('/user/login', '/user*'); // Returns true
isPathnameMatch('/user/login', ['/test', '/home/hello', '/user/*']); // Returns true
```

:::

::: lang dart

```dart
isPathnameMatch('/user/login', '/admin'); // Returns false
isPathnameMatch('/user/login', '/user*'); // Returns true
isPathnameMatch('/user/login', ['/test', '/home/hello', '/user/*']); // Returns true
```

:::

::: lang python

```python
isPathnameMatch('/user/login', '/admin')  # Returns False
isPathnameMatch('/user/login', '/user*')  # Returns True
isPathnameMatch('/user/login', ['/test', '/home/hello', '/user/*'])  # Returns True
```

:::
