# getHomeDir

<NodeRequired en />

Returns the current user's home directory.

The environment decides it first, so a process started with `HOME` set somewhere else is told about that directory rather than the one the account owns.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`USERPROFILE`, such as `C:\\Users\\Sam`, falling back to what the system has on record for the account.' },
	{ os: 'macos', note: '`HOME`, such as `/Users/sam`, falling back to the account record.' },
	{ os: 'linux', note: '`HOME`, such as `/home/sam`, falling back to the password database.' }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getHomeDir()); // Returns '/Users/sam'
```

:::

::: lang python

```python
print(getHomeDir())  # Returns '/Users/sam'
```

:::
