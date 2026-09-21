# parseAddress

Parses an address string into its parts and returns them as an object. It handles ordinary web URLs as well as host-only addresses, IPv4, IPv6 (bare or wrapped in `[]`), and SSH-style connection strings that carry user information such as `ssh://user:pass@host:port`.

The rules are intentionally generic:

- The protocol is only recognized when the string contains `://` (so `host:1234` is treated as a host and port, not a `host` scheme). It is returned in uppercase.
- Nothing is defaulted. Anything that is not present in the input is returned as <Val js="undefined" dart="null" python="None" />, and the port a scheme is normally served on is reported separately as `defaultPort` rather than filled into `port`.
- The user information is split from the host by the **last** `@`, and the user is split from the password by the **first** `:`. This keeps `@` and `:` inside a password intact.
- A bare IPv6 address (`::1`, `fe80::1`) is detected by having two or more colons and cannot carry a port. To attach a port, wrap it in brackets (`[::1]:22`). `host` keeps the brackets and `hostname` drops them.
- `error` is `true` only when the input cannot be parsed (empty input, an invalid port, or an unclosed `[`). A value that is simply absent does **not** set `error`.

To read the parts of a URL you control, your runtime's own URL type is the better tool. This one is for an address a person typed, which may be nothing but a host name, may carry a password, and may use a scheme no URL parser knows.

## Parameters

<ParamsTable :rows="[
	{ name: 'url', type: 'string', required: true, desc: 'The address to parse. Surrounding whitespace is trimmed before anything is read.' },
	{ name: 'options', type: 'ParseAddressOptions', named: true, desc: 'See the table below.' }
]" />

<ParamsTable name="ParseAddressOptions" :rows="[
	{ name: 'decode', type: 'boolean', default: 'true', desc: 'Turn the `%XX` escapes in `user`, `pass` and the values of `params` back into the characters they stand for. A value carrying a sequence that is not an escape, or escapes that do not spell valid UTF-8, is returned exactly as it was written rather than half-decoded.' }
]" />

## Returns

<ReturnType :type="{ js: 'object', dart: 'ParsedAddress' }" />

<ParamsTable name="ParsedAddress" :rows="[
	{ name: 'error', type: 'boolean', desc: 'Whether the address could not be parsed. Always present.' },
	{ name: 'protocol', type: 'string', desc: 'The scheme in uppercase, such as `SSH` or `HTTPS`. Absent unless the address carries `://`.' },
	{ name: 'host', type: 'string', desc: 'The host as it was written, brackets included for a bracketed IPv6 address.' },
	{ name: 'hostname', type: 'string', desc: 'The same host without the brackets, which is the form a connection library takes.' },
	{ name: 'port', type: 'number', desc: 'The port the address names. Absent when it names none, whatever the protocol is.' },
	{ name: 'defaultPort', type: 'number', desc: 'The port the protocol is normally served on. Reported whether or not `port` is present, so `port` still tells you what the address itself said. See the table below for the schemes that have one.' },
	{ name: 'user', type: 'string', desc: 'The user name from the user information.' },
	{ name: 'pass', type: 'string', desc: 'The password from the user information.' },
	{ name: 'path', type: 'string', desc: 'Everything from the first `/` up to the query or the fragment, leading slash included.' },
	{ name: 'query', type: 'string', desc: 'The query as written, without its leading `?`.' },
	{ name: 'params', type: { js: 'object', dart: 'Map<String, String>' }, desc: 'The query read into pairs. A key that repeats keeps its last value, and a pair with no key is left out.' },
	{ name: 'hash', type: 'string', desc: 'The fragment, without its leading `#`.' },
	{ name: 'isIP', type: 'boolean', desc: 'Whether `hostname` is an IPv4 or IPv6 address rather than a name. Always present.' },
	{ name: 'isIPv6', type: 'boolean', desc: 'Whether `hostname` is an IPv6 address. Always present.' }
]" />

### Default ports

`defaultPort` is filled in for these schemes, matched without regard to case. A scheme outside the table leaves it absent.

| Scheme                   | Port  |
| ------------------------ | ----- |
| `ftp`                    | 21    |
| `ssh`, `sftp`            | 22    |
| `telnet`                 | 23    |
| `smtp`                   | 25    |
| `dns`                    | 53    |
| `http`, `ws`             | 80    |
| `pop3`                   | 110   |
| `imap`                   | 143   |
| `ldap`                   | 389   |
| `https`, `wss`           | 443   |
| `smb`                    | 445   |
| `smtps`                  | 465   |
| `ldaps`                  | 636   |
| `ftps`                   | 990   |
| `imaps`                  | 993   |
| `pop3s`                  | 995   |
| `mssql`                  | 1433  |
| `mysql`                  | 3306  |
| `rdp`                    | 3389  |
| `postgres`, `postgresql` | 5432  |
| `vnc`                    | 5900  |
| `redis`                  | 6379  |
| `git`                    | 9418  |
| `mongodb`                | 27017 |

## Examples

::: lang js

```javascript
parseAddress('ssh://test:pass@host:1234');
parseAddress('https://google.com/search?q=hello#top');
parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
parseAddress('ssh://us%40er:p%40ss@host', { decode: false });
```

:::

::: lang dart

```dart
parseAddress('ssh://test:pass@host:1234');
parseAddress('https://google.com/search?q=hello#top');
parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234');
parseAddress('ssh://us%40er:p%40ss@host', decode: false);
```

:::

::: lang python

```python
parseAddress('ssh://test:pass@host:1234')
parseAddress('https://google.com/search?q=hello#top')
parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234')
parseAddress('ssh://us%40er:p%40ss@host', decode=False)
```

:::

Examples of returned values:

```json5
// parseAddress('ssh://test:pass@host:1234')
// Absent values are `undefined` (JavaScript) or `null` (Dart/Python), and are
// left out below.
{
	error: false,
	protocol: 'SSH',
	defaultPort: 22,
	host: 'host',
	hostname: 'host',
	port: 1234,
	user: 'test',
	pass: 'pass',
	isIP: false,
	isIPv6: false
}

// parseAddress('https://google.com/search?q=hello#top')
{
	error: false,
	protocol: 'HTTPS',
	defaultPort: 443,
	host: 'google.com',
	hostname: 'google.com',
	path: '/search',
	query: 'q=hello',
	params: { q: 'hello' },
	hash: 'top',
	isIP: false,
	isIPv6: false
}

// parseAddress('[fe80::f9e9:1d57:9f2d:fb87]:1234')
{
	error: false,
	host: '[fe80::f9e9:1d57:9f2d:fb87]',
	hostname: 'fe80::f9e9:1d57:9f2d:fb87',
	port: 1234,
	isIP: true,
	isIPv6: true
}

// parseAddress('host:abc') -> invalid port
{
	error: true,
	host: 'host',
	hostname: 'host',
	isIP: false,
	isIPv6: false
}
```
