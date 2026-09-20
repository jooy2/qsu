# getArch

<NodeRequired en />

Returns the processor architecture the running program was built for, such as `x64` or `arm64`.

The answer is one of `arm`, `arm64`, `ia32`, `loong64`, `mips`, `mipsel`, `ppc`, `ppc64`, `riscv64`, `s390`, `s390x` and `x64`. A system that answers with a name of its own, such as `aarch64` or `AMD64`, is translated into this list, so both packages report the same architecture for the same machine.

This is the architecture of the program, not of the machine underneath it. A 32-bit build running on a 64-bit machine reports `ia32`.

## Platform support

<PlatformSupport :rows="[
	{ os: 'windows', note: '`AMD64` is reported as `x64` and `ARM64` as `arm64`. A 32-bit program reports `ia32` even on a 64-bit machine.' },
	{ os: 'macos', note: '`x64` on an Intel Mac and `arm64` on Apple Silicon. A program running under Rosetta reports `x64`, which is what it was built as.' },
	{ os: 'linux', note: '`x86_64` is reported as `x64`, `aarch64` as `arm64`, and `armv7l` as `arm`.' },
	{ os: 'android', note: 'Reads the same `/proc` files as Linux.' },
	{ os: 'ios', support: { js: 'no', dart: 'yes', python: 'no' }, note: { js: 'Neither the JavaScript nor the Python package runs on iOS.', dart: 'Answers the same system call as macOS.', python: 'Neither the JavaScript nor the Python package runs on iOS.' } }
]" />

## Parameters

No required parameters

## Returns

<ReturnType type="string" />

## Examples

::: lang js

```javascript
console.log(getArch()); // Returns 'arm64'
```

:::

::: lang dart

```dart
print(getArch()); // Returns 'arm64'
```

:::

::: lang python

```python
print(getArch())  # Returns 'arm64'
```

:::
