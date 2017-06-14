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
 * Available formats: 'jwk', 'pem', 'hex', 'blk'.
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
 * Available formats: 'public', 'private'.
 */

/**
 * PEMKeySelector
 *
 * @typedef {String} PEMKeySelector
 *
 * @see SerializableFormat
 * @see BufferFormat
 *
 * @description
 * Available formats: 'public_pkcs1', 'public_pkcs8', 'private_pkcs1', 'private_pkcs8'.
 *
 * Note these refer specifically to different ASN encodings for PEM encoded keys
 * and are not compatible with non-PEM output types.
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
   * @internal For internal use only
   *
   * @description
   * A high level class for accepting and processing keys
   *
   * @throws {InvalidOperationError} If key is omitted
   *
   * @throws {InvalidOperationError} If required options are omitted
   *
   * @param  {Object} key
   * @param  {Object} options
   * @param  {String} options.format
   * @param  {String} options.kty - normalized key type name
   * @param  {String} [options.crv] - normalized curve name (EC & ED only)
   * @param  {String} [options.oid] - ASN oid algorithm descriptor
   * @param  {(KeySelector|PEMKeySelector)} options.selector
   */
  constructor (key, options) {
    if (!key) {
      throw new InvalidOperationError('key is required')
    }

    if (!options) {
      throw new InvalidOperationError('options are required')
    }

    let { kty, format, selector, crv, oid } = options

    if (!options.kty) {
      throw new InvalidOperationError('options.kty is required')
    }

    if (!options.format) {
      throw new InvalidOperationError('options.format is required')
    }

    if (!options.selector) {
      throw new InvalidOperationError('options.selector is required')
    }

    if (!options.crv && !options.oid) {
      throw new InvalidOperationError('options.crv or options.oid is required')
    }

    this.kty = kty
    this.format = format
    this.selector = selector
    this.crv = crv
    this.oid = oid
    this.key = this.parseKey(key)
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
   * @example <caption>Decode HEX (Blockchain) private key and convert to PEM PKCS8 public key</caption>
   * const keyto = require('@eternaldeiwos/keyto')
   *
   * let blk = getPrivateBlockchainHexStringSomehow()
   * let pemPublic = getPublicPemSomehow()
   *
   * let key = keyto.from(blk, 'blk').toString('pem', 'public_pkcs8')
   * assertEqual(pemPublic, key)
   *
   * @throws {InvalidOperationError}
   * If key is omitted.
   *
   * @throws {InvalidOperationError}
   * If format is omitted.
   *
   * @param  {(JWK|String|Array|Buffer)} key
   * @param  {(SerializableFormat|BufferFormat)} format
   * @return {Key}
   */
  static from (key, format) {
    // Sanity checking
    if (!key) {
      throw new InvalidOperationError('key is required')
    }

    if (!format) {
      throw new InvalidOperationError('format is required')
    }

    // JWK
    if (format === 'jwk') {
      let jwk

      // Parse JSON
      if (typeof key === 'string') {
        try {
          jwk = JSON.parse(key)
        } catch (error) {
          throw new InvalidOperationError('key is not a valid JWK')
        }

      } else if (typeof key === 'object') {
        jwk = key
      }

      let { kty, crv } = jwk

      // Required properties
      if (!kty) {
        throw new InvalidOperationError('kty is required for JWK')
      }

      if (!crv) {
        throw new InvalidOperationError('crv is required for JWK')
      }

      // Key type
      let selector = jwk.d ? 'private' : 'public'

      return new Key(jwk, { kty, crv, format, selector })
    }

    // PEM
    if (format === 'pem') {
      if (typeof key !== 'string') {
        throw new InvalidOperationError('key is not a valid PEM string')
      }

      // Extract Base64 String
      let lines = pem.split('\n')
      let header = lines.splice(0, 1)
      lines.splice(lines.length-1, 1)
      let base64pem = lines.join('')

      // Extract metadata from header
      let match = /^-----BEGIN ((RSA|EC) )?(PUBLIC|PRIVATE) KEY-----$/.exec(header)
      let kty = match ? match[2] : undefined
      let selector = match ? match[3] : undefined
      let pem = Buffer.from(base64pem, 'base64')

      if (!selector) {
        throw new InvalidOperationError('key is not a valid PEM string')
      }

      // PKCS8
      if (!kty) {
        let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
        let PublicKeyInfo = asn.normalize('PublicKeyInfo')

        let decoded
        if (selector === 'PRIVATE') {
          selector = 'private_pkcs8'
          decoded = PrivateKeyInfo.decode(pem, 'der')
        } else if (selector === 'PUBLIC') {
          selector = 'public_pkcs8'
          decoded = PublicKeyInfo.decode(pem, 'der')
        }

        let { algorithm: { algorithm } } = decoded
        let oid = algorithm.join('.')
        kty = types.type(oid)

        if (!kty) {
          throw new OperationNotSupportedError()
        }

      // PKCS1
      } else {
        selector = selector === 'PRIVATE' ? 'private_pkcs1' : 'public_pkcs1'
      }

      return new Key(pem, { kty, oid, format, selector })
    }

    // BLK
    if (format === 'blk') {
      return new Key(key, { kty: 'EC', crv: 'K-256', format, selector: 'private' })
    }

    throw new InvalidOperationError(`Invalid format ${format}`)
  }

  /**
   * alg
   * @ignore
   *
   * @internal For internal use only
   */
  get alg () {
    let { kty, crv, oid } = this

    if (!this.algorithm) {
      if (crv) {
        Object.defineProperty(this, 'algorithm', { value: types.normalize(kty, 'crv', crv) })
      } else if (oid) {
        Object.defineProperty(this, 'algorithm', { value: types.normalize(kty, 'oid', oid) })
      } else {
        throw new Error('Both crv and oid are undefined')
      }
    }

    return this.algorithm
  }

  /**
   * parseKey
   * @ignore
   *
   * @internal For internal use only
   */
  parseKey (key) {
    let { alg, format, selector } = this

    // PEM
    if (format === 'pem') {
      switch (selector) {
        case 'public_pkcs1':
          this.key = alg.fromPublicPKCS1(key)
          break

        case 'public_pkcs8':
          this.key = alg.fromPublicPKCS8(key)
          break

        case 'private_pkcs1':
          this.key = alg.fromPrivatePKCS1(key)
          break

        case 'private_pkcs8':
          this.key = alg.fromPrivatePKCS8(key)
          break

        default:
          throw new Error('Invalid selector value')
      }
    }

    // JWK
    if (format === 'jwk') {
      this.key = alg.fromJwk(key, selector)
    }

    // BLK
    if (format === 'blk') {
      this.key = alg.fromBlk(key)
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
    let { key, alg } = this

    switch (selector) {
      case 'public':
        return alg.toPublicJwk(key)

      case 'private':
        return alg.toPrivateJwk(key)

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
   * @param  {SerializableFormat} [format=pem]
   * @param  {(KeySelector|PEMKeySelector)} [selector=public_pkcs8]
   * @return {String}
   */
  toString(format = 'pem', selector = 'public_pkcs8') {
    let { key, alg } = this

    // PEM
    if (format === 'pem') {
      switch (selector) {
        case 'public_pkcs1':
          return alg.toPublicPKCS1(key)

        case 'public_pkcs8':
          return alg.toPublicPKCS8(key)

        case 'private_pkcs1':
          return alg.toPrivatePKCS1(key)

        case 'private_pkcs8':
          return alg.toPrivatePKCS8(key)

        default:
          throw new Error('Invalid key selector')
      }

    // JWK
    } else if (format === 'jwk') {
      switch (selector) {
        case 'public':
          return JSON.stringify(alg.toPublicJwk(key))

        case 'private':
          return JSON.stringify(alg.toPrivateJwk(key))

        default:
          throw new Error('Invalid key selector')
      }

    // BLK
    } else if (format === 'blk') {
      switch (selector) {
        case 'private':
          return alg.toBlk(key)

        case 'public':
          throw new OperationNotSupportedError()

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
