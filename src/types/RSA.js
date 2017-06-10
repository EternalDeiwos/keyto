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
 * @ignore
 */
class RSA extends KeyType {

  /**
   * constructor
   *
   * @class RSA
   *
   * @extends {KeyType}
   *
   * @description
   * RSA conversion implementation
   */
  constructor (data) {
    super(data)

    if (this.d) {
      Object.defineProperty(this, 'private', { value: true })
    } else {
      Object.defineProperty(this, 'private', { value: false })
    }
  }

  static get oid () {
    return [ 1, 2, 840, 113549, 1, 1, 1 ]
  }

  static get parameters () {
    return Buffer.from('0500', 'hex')
  }

  static fromPrivatePem (base64pem) {
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
    let { n, e, d, p, q, dp, dq, qi } = jwk
    let data = Converter.convertObject({ n, e, d, p, q, dp, dq, qi }, 'base64url', 'raw')
    return new RSA(data)
  }

  toPem () {
    if (this.private) {
      let base64pem = this.toPrivatePemB64()
      return RSA.formatPem(base64pem, 'RSA PRIVATE')
    } else {
      let base64pem = this.toPublicPemB64()
      return RSA.formatPem(base64pem, 'PUBLIC')
    }
  }

  toPublicPemB64 () {
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')
    let RSAPublicKey = asn.normalize('RSAPublicKey')

    let converted = Converter.convertObject(this, 'raw', 'bn')
    let data = RSAPublicKey.encode(converted, 'der')
    return PublicKeyInfo.encode({
      algorithm: {
        algorithm: RSA.oid,
        parameters: RSA.parameters
      },
      publicKey: {
        unused: 0,
        data
      }
    }, 'der').toString('base64')
  }

  toPrivatePemB64 () {
    let RSAPrivateKey = asn.normalize('RSAPrivateKey')

    let data = Converter.convertObject(this, 'raw', 'bn')
    return RSAPrivateKey.encode(data, 'der').toString('base64')
  }

  toJwk () {
    let jwk = Object.assign({ kty: 'RSA' }, Converter.convertObject(this, 'raw', 'base64url'))
    delete jwk.version
    return jwk
  }
}

/**
 * Export
 * @ignore
 */
module.exports = RSA
