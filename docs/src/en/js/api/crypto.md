---
title: Crypto
order: 6
---

# API: Crypto

## `_.encrypt`

Encrypt with the algorithm of your choice (algorithm default: `aes-256-cbc`, ivSize default: `16`) using a string and a secret (secret).

### Parameters

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`
- `ivSize::number || 16`

### Returns

> string

### Examples

```javascript
_.encrypt('test', 'secret-key');
```

## `_.decrypt`

Decrypt with the specified algorithm (default: `aes-256-cbc`) using a string and a secret (secret).

### Parameters

- `str::string`
- `secret::string`
- `algorithm::string || 'aes-256-cbc'`

### Returns

> string

### Examples

```javascript
_.decrypt('61ba43b65fc...', 'secret-key');
```

## `_.objectId`

Returns a random string hash of the ObjectId format (primarily utilized by MongoDB).

### Parameters

No parameters required

### Returns

> string

### Examples

```javascript
_.objectId(); // Returns '651372605b49507aea707488'
```

## `_.md5`

Converts String data to md5 hash value and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.md5('test'); // Returns '098f6bcd4621d373cade4e832627b4f6'
```

## `_.sha1`

Converts String data to sha1 hash value and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.sha1('test'); // Returns 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
```

## `_.sha256`

Converts String data to sha256 hash value and returns it.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.sha256('test'); // Returns '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
```

## `_.encodeBase64`

Base64-encode the given string.

### Parameters

- `str::string`

### Returns

> string

### Examples

```javascript
_.encodeBase64('this is test'); // Returns 'dGhpcyBpcyB0ZXN0'
```

## `_.decodeBase64`

Decodes an encoded base64 string to a plain string.

### Parameters

- `encodedStr::string`

### Returns

> string

### Examples

```javascript
_.decodeBase64('dGhpcyBpcyB0ZXN0'); // Returns 'this is test'
```

## `_.strToNumberHash`

Returns the specified string as a hash value of type number. The return value can also be negative.

### Parameters

- `str::string`

### Returns

> number

### Examples

```javascript
_.strToNumberHash('abc'); // Returns 96354
_.strToNumberHash('Hello'); // Returns 69609650
_.strToNumberHash('hello'); // Returns 99162322
```
