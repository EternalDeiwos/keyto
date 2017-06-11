'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const InvalidOperationError = require('./InvalidOperationError')
const OperationNotSupportedError = require('./OperationNotSupportedError')
const types = require('./types')
const asn = require('./asn1')

/**
 * JWK
 *
 * @typedef {Object} JWK
 *
 * @description
 * A JWK Object
 */

/**
 * SerializedFormat
 *
 * @typedef {String} SerializableFormat
 *
 * @description
 * Available formats: 'jwk', 'pem', 'hex'.
 */

/**
 * BufferFormat
 *
 * @typedef {String} BufferFormat
 *
 * @description
 * Available formats: 'raw', 'uint8_array'.
 */

/**
 * KeySelector
 *
 * @typedef {String} KeySelector
 *
 * @see SerializableFormat
 * @see BufferFormat
 *
 * @description
 * Available formats: 'public', 'private', 'pkcs1', 'pkcs8'.
 *
 * Note that 'pkcs1' and 'pkcs8' refer specifically to different ASN
 * encodings for PEM encoded private keys and are not compatible with
 * non-PEM output types.
 */

/**
 * Key
 * @ignore
 */
class Key {

  /**
   * constructor
   *
   * @class Key
   *
   * @description
   * A high level class for accepting and processing keys
   *
   * @param  {Object} key
   * @param  {Object} options
   * @param  {String} options.format
   * @param  {String} options.kty - normalized key type name
   * @param  {String} [options.crv] - normalized curve name (EC & ED only)
   * @param  {String} [options.alg] - JWA algorithm name
   * @param  {String} [options.oid] - ASN oid algorithm descriptor
   * @param  {String} [options.pvt] - PUBLIC, PKCS1 or PKCS8 (PEM only)
   * @param  {(String|Array)} [options.oid] - PKCS algorithm oid
   */
  constructor (key, options) {
    if (!options || !options.kty || !options.format) {
      throw new InvalidOperationError('options.kty and options.format are required')
    }

    Object.assign(this, options)
    this.parseKey(key)
  }

  /**
   * from
   *
   * @description
   * Import a key
   *
   * @example <caption>Decode PEM and convert to JWK</caption>
   * const keyto = require('@eternaldeiwos/keyto')
   *
   * let pemPrivate = getPrivatePemStringSomehow()
   * let jwk = getPublicJwkSomehow()
   *
   * // String data can either be passed in directly:
   * let key = keyto.from(pemPrivate, 'pem').toJwk('public')
   *
   * // Or can be passed in as an object instead:
   * let key = keyto.from({ key: pemPrivate }, 'pem').toJwk('public')
   * assertEqual(jwk, key)
   *
   * @example <caption>Decode HEX private key and convert to PEM public key</caption>
   * const keyto = require('@eternaldeiwos/keyto')
   *
   * let hex = getPrivateHexStringSomehow()
   * let pemPublic = getPublicPemSomehow()
   *
   * // With Hex input, the 'kty' needs to be explicitly specified,
   * // as well as the 'crv' in the case of ECDSA hex encoded keys.
   * let key = keyto.from({ key: hex, kty: 'EC', crv: 'K-256' }, 'hex').toString('public', 'pem')
   * assertEqual(pemPublic, key)
   *
   * @throws {InvalidOperationError}
   * If format is omitted.
   *
   * @throws {InvalidOperationError}
   * If format is not 'pem' or 'jwk' and kty is omitted.
   *
   * @param  {(Object|JWK|String|Array|Buffer)} data
   * @param  {(JWK|String|Array|Buffer)} data.key
   * @param  {String} [data.kty] - normalized key type name
   * @param  {String} [data.crv] - normalized curve name (EC & ED only)
   * @param  {String} [data.alg] - normalized algorithm name (RSA only)
   * @param  {(SerializableFormat|BufferFormat)} format
   * @return {Key}
   */
  static from (data, format) {
    if (!data) {
      throw new InvalidOperationError('data is required')
    }

    let { key } = data
    if (!key) {
      key = data
    }

    // Sanity checking
    if (!format) {
      throw new InvalidOperationError('format is required')

    } else if (format !== 'pem' && format !== 'jwk' && !data.kty) {
      throw new InvalidOperationError(`kty is required if format is not 'pem' or 'jwk'`)
    }

    // JWK
    if (format === 'jwk') {
      let jwk = key

      if (typeof key === 'string') {
        try {
          jwk = JSON.parse(key)
        } catch (error) {
          throw new InvalidOperationError('key is not a valid JWK')
        }
      }

      let { kty, crv, alg } = jwk

      if (!kty && !data.kty) {
        throw new InvalidOperationError('kty is required')
      } else if (!kty && data.kty) {
        kty = data.kty
      }

      if (!crv && data.crv) {
        crv = data.crv
      }

      if (!alg && data.alg) {
        alg = data.alg
      }

      return new Key(jwk, { kty, crv, alg, format })
    }

    // PEM
    if (format === 'pem') {
      if (typeof key !== 'string') {
        throw new InvalidOperationError('key is not a valid PEM string')
      }

      let { header, base64pem } = this.stripPemHeader(key)
      let match = /^-----BEGIN ((RSA|EC) )?(PUBLIC|PRIVATE) KEY-----$/.exec(header)
      let kty = match ? match[2] : undefined
      let pvt = match ? (match[3] === 'PRIVATE' ? 'PKCS1' : 'PUBLIC') : undefined

      if (!pvt) {
        throw new InvalidOperationError('key is not a valid PEM string')
      }

      // TODO this is essentially a waste and needs refactoring for 1.0
      if (!kty && !data.kty) {
        kty = Key.getPemKeyType(base64pem, pvt)
        pvt = pvt === 'PKCS1' ? 'PKCS8' : 'PUBLIC'

      } else if (!kty && data.kty) {
        kty = data.kty
      }

      return new Key(base64pem, { kty, pvt, format })
    }

    // HEX
    if (format === 'hex') {
      throw new OperationNotSupportedError()
    }

    // RAW
    if (format === 'raw') {
      throw new OperationNotSupportedError()
    }

    // UINT8_ARRAY
    if (format === 'uint8_array') {
      throw new OperationNotSupportedError()
    }

    throw new InvalidOperationError(`Invalid format ${format}`)
  }

  /**
   * stripPemHeader
   * @ignore
   *
   * @internal For internal use only.
   */
  static stripPemHeader (pem) {
    let lines = pem.split('\n')
    let header = lines.splice(0, 1)
    lines.splice(lines.length-1, 1)
    let base64pem = lines.join('')

    return { header, base64pem }
  }

  /**
   * getPemKeyType
   * @ignore
   *
   * @internal For internal use only.
   */
  static getPemKeyType (key, pvt) {
    let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')
    let buffer = Buffer.from(key, 'base64')

    let decoded
    if (pvt === 'PKCS1') {
      decoded = PrivateKeyInfo.decode(buffer, 'der')
    } else {
      decoded = PublicKeyInfo.decode(buffer, 'der')
    }

    let { algorithm: { algorithm } } = decoded
    let type = types.normalizeOid(algorithm)
    let kty = type ? type.kty : undefined

    if (!kty) {
      throw new OperationNotSupportedError()
    }

    return kty
  }

  /**
   * normalizedType
   * @ignore
   *
   * @internal For internal use only
   */
  get normalizedType () {
    let { kty } = this

    if (kty) {
      return types.normalizeKty(kty)
    }

    throw new OperationNotSupportedError()
  }

  /**
   * parseKey
   * @ignore
   *
   * @internal For internal use only
   */
  parseKey (key) {
    let { crv, alg, oid, pvt, format, normalizedType: type } = this

    // PEM
    if (format === 'pem') {
      switch (pvt) {
        case 'PUBLIC':
          this.key = type.fromPublicPem(key)
          break

        case 'PKCS1':
          this.key = type.fromPKCS1(key)
          break

        case 'PKCS8':
          this.key = type.fromPKCS8(key)
          break

        default:
          throw new Error('Invalid pvt value')
      }
    }

    // JWK
    if (format === 'jwk') {
      this.key = type.fromJwk(key)
    }

    // HEX
    if (format === 'hex') {
      this.key = type.fromHex(key, { crv, oid })
    }

    // BUFFER
    if (format === 'raw') {
      throw new OperationNotSupportedError()
    }

    // UINT8_ARRAY
    if (format === 'uint8_array') {
      throw new OperationNotSupportedError()
    }
  }

  /**
   * toJwk
   *
   * @description
   * Convert a key to JWK.
   *
   * @param  {KeySelector} selector
   *
   * @return {JWK}
   */
  toJwk (selector) {
    let { key } = this

    switch (selector) {
      case 'public':
        return key.toPublicJwk()

      case 'private':
        return key.toPrivateJwk()

      default:
        throw new Error('Invalid key selector')
    }

    throw new OperationNotSupportedError()
  }

  /**
   * toString
   *
   * @description
   * Serialize a key to the specified format
   *
   * @param  {SerializedFormat} [format=pem]
   * @param  {KeySelector} [selector=public]
   * @return {String}
   */
  toString(format = 'pem', selector = 'public') {
    let { key, crv, alg } = this

    // PEM
    if (format === 'pem') {
      switch (selector) {
        case 'public':
          return key.toPublicPem()

        case 'pkcs1':
        case 'private':
          return key.toPKCS1()

        case 'pkcs8':
          return key.toPKCS8()

        default:
          throw new Error('Invalid key selector')
      }

    // JWK
    } else if (format === 'jwk') {
      switch (selector) {
        case 'public':
          return JSON.stringify(key.toPublicJwk())

        case 'private':
          return JSON.stringify(key.toPrivateJwk())

        default:
          throw new Error('Invalid key selector')
      }
    }

    throw new OperationNotSupportedError()
  }

}

/**
 * Export
 * @ignore
 */
module.exports = Key
