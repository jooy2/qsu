# getFileHashFromStream

<NodeRequired en />

Returns a file in a Node.js ReadableStream object as a value hashed with a specific algorithm. The default algorithm is `md5`. This method uses `Promise` to return a valid hash value.

## Parameters

<ParamsTable :rows="[
	{ name: 'fileStream', type: 'string', required: true, desc: 'Node.js Readable file stream' },
	{ name: 'algorithm', type: `'md5' | 'sha1' | 'sha256' | 'sha512'`, default: `'md5'`, desc: 'OpenSSL algorithm to be used for file hashing' }
]" />

## Returns

<ReturnType type="Promise<string>" />

## Examples

::: lang js

```javascript
import { createReadStream } from 'node:fs';

await getFileHashFromStream(createReadStream('/home/user/text.txt'), 'sha1');
// '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::

::: lang dart

```dart
import 'dart:io';

await getFileHashFromStream(File('/home/user/text.txt').openRead(),
    algorithm: 'sha1');
// '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::

::: lang python

```python
with open('/home/user/text.txt', 'rb') as file:
	getFileHashFromStream(file, 'sha1')  # '38851813f75627d581c593f3ccfb7061dd013fbd'
```

:::
