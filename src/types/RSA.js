'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const KeyType = require('./KeyType')
const Converter = require('../Converter')
const asn = require('../asn1')

/**
 * RSA
 * @class RSA
 *
 * @extends {KeyType}
 *
 * @description
 * RSA conversion implementation
 */
class RSA extends KeyType {

  static get oid () {
    return [ 1, 2, 840, 113549, 1, 1, 1 ]
  }

  static get parameters () {
    return Buffer.from('0500', 'hex')
  }

  static fromPKCS8 (base64pem) {
    let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let buffer = Buffer.from(base64pem, 'base64')
    let info = PrivateKeyInfo.decode(buffer, 'der')
    let der = RSAPrivateKey.decode(info.privateKey, 'der')
    let data = Converter.convertObject(der, 'bn', 'raw')

    return new RSA(data)
  }

  static fromPKCS1 (base64pem) {
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let buffer = Buffer.from(base64pem, 'base64')
    let der = RSAPrivateKey.decode(buffer, 'der')
    let data = Converter.convertObject(der, 'bn', 'raw')

    return new RSA(data)
  }

  static fromPublicPem (base64pem) {
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')
    let RSAPublicKey = asn.normalize('RSAPublicKey')

    let buffer = Buffer.from(base64pem, 'base64')
    let info = PublicKeyInfo.decode(buffer, 'der')
    let der = RSAPublicKey.decode(info.publicKey.data, 'der')
    let data = Converter.convertObject(der, 'bn', 'raw')

    return new RSA(data)
  }

  static fromJwk (jwk) {
    let { n, e, d, p, q, dp, dq, qi, alg } = jwk
    let data = Converter.convertObject({ n, e, d, p, q, dp, dq, qi }, 'base64url', 'raw')
    return new RSA(data, { alg })
  }

  get isPrivate () {
    return !!this.d
  }

  toPKCS8 () {
    Object.defineProperty(this, 'pkcs8', { value: true })
    let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let converted = Converter.convertObject(this, 'raw', 'bn')
    let privateKey = RSAPrivateKey.encode(converted, 'der')

    let base64pem = PrivateKeyInfo.encode({
      version: 'two-prime',
      algorithm: {
        algorithm: RSA.oid,
        parameters: RSA.parameters
      },
      privateKey
    }, 'der').toString('base64')

    return RSA.formatPem(base64pem, 'PRIVATE')
  }

  toPKCS1 () {
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let data = { version: 'two-prime' }
    Object.assign(data, Converter.convertObject(this, 'raw', 'bn'))

    let base64pem = RSAPrivateKey.encode(data, 'der').toString('base64')

    return RSA.formatPem(base64pem, 'RSA PRIVATE')
  }

  toPublicPem () {
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')
    let RSAPublicKey = asn.normalize('RSAPublicKey')

    let { n, e } = this
    let converted = Converter.convertObject({ n, e }, 'raw', 'bn')
    let data = RSAPublicKey.encode(converted, 'der')

    let base64pem = PublicKeyInfo.encode({
      algorithm: {
        algorithm: RSA.oid,
        parameters: RSA.parameters
      },
      publicKey: {
        unused: 0,
        data
      }
    }, 'der').toString('base64')

    return RSA.formatPem(base64pem, 'PUBLIC')
  }

  toPrivateJwk () {
    let { n, e, d, p, q, dp, dq, qi } = this
    let jwk = Object.assign({ kty: 'RSA' }, Converter.convertObject({ n, e, d, p, q, dp, dq, qi }, 'raw', 'base64url'))
    delete jwk.version
    return jwk
  }

  toPublicJwk () {
    let { n, e } = this
    let jwk = Object.assign({ kty: 'RSA' }, Converter.convertObject({ n, e }, 'raw', 'base64url'))
    delete jwk.version
    return jwk
  }
}

/**
 * Export
 * @ignore
 */
module.exports = RSA
