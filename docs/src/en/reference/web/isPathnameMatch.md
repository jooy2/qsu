# isPathnameMatch

You can check if the URL path in the first argument value is matched against the second set of rules. The matching rules can take a string or an array of strings, where both arguments are paths that start with `/`. You can use wildcards (`*`) in the rules. For example, `user/*` would match all pages that start with `/user`.

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
