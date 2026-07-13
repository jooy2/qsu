# getParsedInfoFromAddress <Lang js dart python />

Parses an address string into its parts and returns them as an object. It handles ordinary web URLs as well as host-only addresses, IPv4, IPv6 (bare or wrapped in `[]`), and SSH-style connection strings that carry user information such as `ssh://user:pass@host:port`.

The rules are intentionally generic:

- The protocol is only recognized when the string contains `://` (so `host:1234` is treated as a host and port, not a `host` scheme). It is returned in uppercase.
- The scheme, port and user information are not defaulted. Anything that is not present in the input is returned as `undefined` (JavaScript) or `null` (Dart/Python).
- The user information is split from the host by the **last** `@`, and the user is split from the password by the **first** `:`. This keeps `@` and `:` inside a password intact.
- A bare IPv6 address (`::1`, `fe80::1`) is detected by having two or more colons and cannot carry a port. To attach a port, wrap it in brackets (`[::1]:22`). Brackets are kept as part of the host.
- The path, query and fragment (everything from the first `/`, `?` or `#`) are dropped.
- `error` is `true` only when the input cannot be parsed (empty input, an invalid port, or an unclosed `[`). A value that is simply absent does **not** set `error`.

## Parameters

<ParamsTable :rows="[
	{ name: 'url', type: 'string', required: true }
]" />

## Returns

> object

## Examples

::: code-group

```javascript [JavaScript]
getParsedInfoFromAddress('ssh://test:pass@host:1234');
getParsedInfoFromAddress('https://google.com');
getParsedInfoFromAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
```

```dart [Dart]
getParsedInfoFromAddress('ssh://test:pass@host:1234');
getParsedInfoFromAddress('https://google.com');
getParsedInfoFromAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
```

```python [Python]
getParsedInfoFromAddress('ssh://test:pass@host:1234')
getParsedInfoFromAddress('https://google.com')
getParsedInfoFromAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234')
```

:::

Examples of returned values:

```json5
// getParsedInfoFromAddress('ssh://test:pass@host:1234')
{
	error: false,
	protocol: 'SSH',
	host: 'host',
	port: 1234,
	user: 'test',
	pass: 'pass'
}

// getParsedInfoFromAddress('https://google.com')
// Absent values are `undefined` (JavaScript) or `null` (Dart/Python).
{
	error: false,
	protocol: 'HTTPS',
	host: 'google.com',
	port: undefined,
	user: undefined,
	pass: undefined
}

// getParsedInfoFromAddress('host:abc') -> invalid port
{
	error: true,
	protocol: undefined,
	host: 'host',
	port: undefined,
	user: undefined,
	pass: undefined
}
```
