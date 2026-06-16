---
title: Python
order: 3
---

# Installation for Python <Lang python />

There are a few simple steps to install **qsu** in Python.

You need to have at least `Python 3.8` to install **qsu**. For security and high compatibility, it is recommended to use a recent, actively maintained version of Python.

After configuring the Python environment, run the following command to install the library:

```bash
$ pip install qsu
```

## How to use

Import the functions you need directly from the `qsu` package. Function names, parameters, and behavior match the JavaScript implementation, so the same call works across languages.

```python
from qsu import capitalizeFirst, strCount

def main():
    print(capitalizeFirst('abcd'))  # 'Abcd'
    print(strCount('123412341234', '1'))  # 3
```

::: tip
The Python package currently implements the `string` utilities (and the `verify` / `math` helpers they rely on). More modules are being ported to match the JavaScript reference implementation.
:::

To learn more about the functions supported, refer to the [Reference](/reference/index.md) documentation.
