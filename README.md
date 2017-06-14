# Keyto

A utility for translating cryptographic keys between representations.

Keyto is pronounced 'key-to'.

### Documentation

Project documentation is available [here](https://eternaldeiwos.github.io/keyto).

## Status

### RSA

- [x] PKCS1
- [x] PKCS8
- [x] JWK
- [ ] RAW
- [ ] UINT8_ARRAY
- [ ] HEX

### ECDSA - secp256k1 (Blockchain Curve)

- [x] PKCS1
- [x] PKCS8
- [x] JWK
- [ ] RAW
- [ ] UINT8_ARRAY
- [ ] HEX
- [x] BLK (Private Key Hex String)

### ECDSA - secp256r1 (P-256)

- [ ] PKCS1
- [ ] PKCS8
- [ ] JWK
- [ ] RAW
- [ ] UINT8_ARRAY
- [ ] HEX

### ECDSA - secp384r1 (P-384)

- [ ] PKCS1
- [ ] PKCS8
- [ ] JWK
- [ ] RAW
- [ ] UINT8_ARRAY
- [ ] HEX

### ECDSA - secp521r1 (P-512)

- [ ] PKCS1
- [ ] PKCS8
- [ ] JWK
- [ ] RAW
- [ ] UINT8_ARRAY
- [ ] HEX

### EDDSA - ed25519

- [ ] PKCS1
- [ ] PKCS8
- [ ] JWK
- [ ] RAW
- [ ] UINT8_ARRAY
- [ ] HEX
- [ ] BLK

## Usage

Translate Private PEM to Public JWK:

```js
const keyto = require('@trust/keyto')

let pemPrivate = getPrivatePemStringSomehow()
let jwk = getPublicJwkSomehow()

// String data can either be passed in directly:
let key = keyto.from(pemPrivate, 'pem').toJwk('public')

// Or can be passed in as an object instead:
let key = keyto.from({ key: pemPrivate }, 'pem').toJwk('public')
assertEqual(jwk, key)
```

Translate Private Hex (Blockchain) Key to PKCS8 Public PEM:

```js
const keyto = require('@eternaldeiwos/keyto')

let blk = getPrivateBlockchainHexStringSomehow()
let pemPublic = getPublicPemSomehow()

let key = keyto.from(blk, 'blk').toString('pem', 'public_pkcs8')
assertEqual(pemPublic, key)
```

## API

### keyto.from(data, format) -> {Key}

**args**:

* data := (Object|String|Array|Buffer)
    - data.key := (Object|String|Array|Buffer)
    - data.kty := String
    - data.crv := String
    - data.alg := String
* format := String

### {Key}.toJwk(selector = 'public') -> {Object}

**args**:

* selector := String

Selector can be any of these: 'public', 'private'.

selector = public: will produce a public JWK.
selector = private: will produce a private JWK.

### {Key}.toString(format = 'pem', selector = 'public') -> {String}

**args**:

* format := String
* selector := String

Format can be any of these: 'pem', 'jwk', 'hex', 'raw', 'uint8_array' or 'blk'.

* format = pem: will produce a PEM encoded string (as per OpenSSL output).
* format = jwk: will produce a stringified JWK.
* format = hex: will produce a hex encoded DER string. (WIP)
* format = raw: will produce a buffer containing DER bytes. (WIP)
* format = uint8_array: will produce a uint8 array containing DER bytes. (WIP)
* format = blk: will produce a hex encoded key string as used on various blockchains (limited to secp256k1 keys).

Selector can be any of these: 'public', 'private', 'public_pkcs1', 'public_pkcs8', 'private_pkcs1' or 'private_pkcs8'.

* selector = public: will produce a public key.
* selector = private: will produce a private key.
* selector = public_pkcs1: will produce a public key according to the PKCS1 ASN Schema. Only relevant to DER related encodings.
* selector = public_pkcs8: will produce a public key according to the PKCS8 ASN Schema. Only relevant to DER related encodings.
* selector = private_pkcs1: will produce a private key according to the PKCS1 ASN Schema. Only relevant to DER related encodings.
* selector = private_pkcs8: will produce a private key according to the PKCS8 ASN Schema. Only relevant to DER related encodings.

