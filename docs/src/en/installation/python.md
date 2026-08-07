---
title: Python
order: 3
---

# Installation for Python <Lang python />

There are a few simple steps to install **qsu** in Python.

You need to have at least `Python 3.8` to install **qsu**. For security and high compatibility, it is recommended to use a recent, actively maintained version of Python.

After configuring the Python environment, run the following command to install the library:

::: code-group

```bash [pip]
$ pip install qsu
```

```bash [uv]
$ uv add qsu
```

```bash [poetry]
$ poetry add qsu
```

:::

**qsu** is published to PyPI, so modern package managers such as [uv](https://docs.astral.sh/uv), [Poetry](https://python-poetry.org), and [PDM](https://pdm-project.org) resolve it from their default index without any extra configuration.

If you use `uv` outside of a project (for example, in a plain virtual environment), install it with the pip-compatible command instead:

```bash
$ uv pip install qsu
```

## How to use

Import the functions you need directly from the `qsu` package. Function names, parameters, and behavior match the JavaScript implementation, so the same call works across languages.

```python
from qsu import capitalizeFirst, strCount

def main():
    print(capitalizeFirst('abcd'))  # 'Abcd'
    print(strCount('123412341234', '1'))  # 3
```

To learn more about the functions supported, refer to the [Reference](/reference/index.md) documentation.
