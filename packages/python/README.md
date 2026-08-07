# qsu - Quick & Simple Utility (Python)

**qsu** is a library that collects frequently used utility functions.

## Installation

**qsu** requires `Python 3.8` or later.

```bash
$ pip install qsu
```

**qsu** is published to PyPI, so modern package managers such as [uv](https://docs.astral.sh/uv), [Poetry](https://python-poetry.org), and [PDM](https://pdm-project.org) can install it from their default index without any extra configuration:

```bash
$ uv add qsu
$ poetry add qsu
$ pdm add qsu
```

## How to use

```python
from qsu import capitalizeFirst, strCount

print(capitalizeFirst('abcd'))  # 'Abcd'
print(strCount('123412341234', '1'))  # 3
```

For more information on all supported functions, see the [Reference](https://qsu.cdget.com/reference) documentation.

## License

Please see the [LICENSE](LICENSE) file for more information.
