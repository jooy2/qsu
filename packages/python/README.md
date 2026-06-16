# qsu - Quick & Simple Utility (Python)

**qsu** is a library that collects frequently used utility functions. This is the Python implementation, mirroring the JavaScript reference implementation.

> Function names, parameters, and behavior match the JavaScript implementation. The package covers the `string`, `array`, `object`, `date`, `format`, `math`, `verify`, `web`, `misc`, `crypto`, `file`, `os`, and `net` modules. Unlike the JavaScript package (where filesystem/OS/network/crypto helpers live under `qsu/node`), every function is importable directly from the top-level `qsu` package, since Python has no browser/runtime split. Functions that are asynchronous in JavaScript (e.g. `sleep`, `fetchData`, file I/O) are implemented synchronously in Python.

## Installation

**qsu** requires `Python 3.8` or later.

```bash
$ pip install qsu
```

## How to use

Import the functions you need directly from the `qsu` package. Function names, parameters, and behavior match the JavaScript implementation.

```python
from qsu import capitalizeFirst, strCount

print(capitalizeFirst('abcd'))  # 'Abcd'
print(strCount('123412341234', '1'))  # 3
```

For more information on all supported functions, see the [Reference](https://qsu.cdget.com/reference) documentation.

## License

Please see the [LICENSE](LICENSE) file for more information.
