# getHostname <Lang js python />

<NodeRequired en />

Retrieves the host name of the current device. This is usually the name of the system that was automatically set on the desktop or changed by the user.

## Parameters

No required parameters

## Returns

> string

## Examples

::: lang js

```javascript
console.log(await getHostname()); // e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::

::: lang python

```python
print(getHostname())  # e.g. 'My PC', 'DESKTOP-ABCDEFG'...
```

:::
