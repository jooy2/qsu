# getShell

<NodeRequired en />

Returns the path to the shell recorded for the current account.

That is the shell a login starts, which is not always the one the caller is typing into: a user whose account says `/bin/bash` but who ran `zsh` by hand still reads `/bin/bash` here.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: 'Windows has no login shell, so the command interpreter is reported instead: `ComSpec`, which is `C:\\Windows\\system32\\cmd.exe` on a normal installation. PowerShell is never reported, whatever the user opens.' },
	{ os: 'macos', note: 'The shell in the account record, such as `/bin/zsh`.' },
	{ os: 'linux', note: 'The shell in the password database, such as `/bin/bash`. An account with no entry falls back to `SHELL` in the environment, and then to `/bin/sh`.' },
	{ os: 'android', languages: 'dart', note: '`SHELL` where it is set. An app process usually has none, and `/bin/sh` is returned.' },
	{ os: 'ios', languages: 'dart', note: 'iOS has no shell. `/bin/sh` is returned as the last resort.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getShell()); // Returns '/bin/zsh'
```

:::

::: lang dart

```dart
print(getShell()); // Returns '/bin/zsh'
```

:::

::: lang python

```python
print(getShell())  # Returns '/bin/zsh'
```

:::
