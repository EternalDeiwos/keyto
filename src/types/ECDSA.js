'use strict'

/**
 * Dependencies
 * @ignore
 */
const bignum = require('asn1.js').bignum
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

/**
 * Module Dependencies
 * @ignore
 */
const KeyType = require('./KeyType')
const InvalidOperationError = require('../InvalidOperationError')
const Converter = require('../Converter')
const asn = require('../asn1')

/**
 * ECDSA
 * @class ECDSA
 *
 * @extends {KeyType}
 *
 * @description
 * ECDSA conversion implementation
 */
class ECDSA extends KeyType {

  static get kty () {
    return 'EC'
  }

  static get oid () {
    return [ 1, 2, 840, 10045, 2, 1 ]
  }

  static get parameters () {
    return Buffer.from('06052b8104000a', 'hex')
  }

  static fromPrivatePKCS1 (base64pem) {
    let ECPrivateKey = asn.normalize('ECPrivateKey')

    let buffer = Buffer.from(base64pem, 'base64')
    let data = ECPrivateKey.decode(buffer, 'der')

    let { privateKey: d, publicKey: { data: publicKey } } = data
    let { x, y } = ECDSA.getPoint(publicKey)

    return new ECDSA({ d, x, y })
  }

  static fromPrivatePKCS8 (base64pem) {
    let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    let ECPrivateKey = asn.normalize('ECPrivateKey')

    let buffer = Buffer.from(base64pem, 'base64')
    let info = PrivateKeyInfo.decode(buffer, 'der')
    let data = ECPrivateKey.decode(info.privateKey, 'der')

    let { privateKey: d, publicKey: { data: publicKey } } = data
    let { x, y } = ECDSA.getPoint(publicKey)

    return new ECDSA({ d, x, y })
  }

  static fromPublicPKCS8 (base64pem) {
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')

    let buffer = Buffer.from(base64pem, 'base64')
    let info = PublicKeyInfo.decode(buffer, 'der')
    let data = ECDSA.getPoint(info.publicKey.data)

    return new ECDSA(data)
  }

  static fromJwk (jwk) {
    let { d, x, y, crv } = jwk

    if (!crv) {
      throw new Error('crv is required')
    }

    return new ECDSA({
      d: Converter.convert(d, 'base64url', 'raw'),
      x: Converter.convert(x, 'base64url', 'raw'),
      y: Converter.convert(y, 'base64url', 'raw'),
    }, { crv })
  }

  static fromBlk (blk) {
    let privateKey = ec.keyFromPrivate(blk, 'hex')
    let publicKey = privateKey.getPublic()

    let data = {
      d: Converter.convert(privateKey.priv, 'bn', 'raw'),
      x: Converter.convert(publicKey.getX(), 'bn', 'raw'),
      y: Converter.convert(publicKey.getY(), 'bn', 'raw')
    }

    return new ECDSA(data)
  }

  get isPrivate () {
    return !!this.d
  }

  toPrivatePKCS1 () {
    if (!this.isPrivate) {
      throw new InvalidOperationError('Cannot export a private key from a public key')
    }

    let ECPrivateKey = asn.normalize('ECPrivateKey')

    let { d, x, y } = this
    let publicKey = ECDSA.makePoint(x, y)
    let base64pem = ECPrivateKey.encode({
      version: 1,
      privateKey: d,
      parameters: {
        type: 'namedCurve',
        value: [ 1, 3, 132, 0, 10 ]
      },
      publicKey: {
        unused: 0,
        data: publicKey
      }
    }, 'der').toString('base64')

    return ECDSA.formatPem(base64pem, 'EC PRIVATE')
  }

  toPrivatePKCS8 () {
    if (!this.isPrivate) {
      throw new InvalidOperationError('Cannot export a private key from a public key')
    }

    let PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    let ECPrivateKey = asn.normalize('ECPrivateKey')

    let { d, x, y, constructor: { oid: algorithm, parameters } } = this
    let publicKey = ECDSA.makePoint(x, y)
    let privateKey = ECPrivateKey.encode({
      version: 1,
      privateKey: d,
      publicKey: {
        unused: 0,
        data: publicKey
      }
    }, 'der')

    let base64pem = PrivateKeyInfo.encode({
      version: 'two-prime',
      algorithm: {
        algorithm,
        parameters
      },
      privateKey
    }, 'der').toString('base64')

    return ECDSA.formatPem(base64pem, 'PRIVATE')
  }

  toPublicPKCS8 () {
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')

    let data = ECDSA.makePoint(this.x, this.y)
    let base64pem = PublicKeyInfo.encode({
      algorithm: {
        algorithm: ECDSA.oid,
        parameters: ECDSA.parameters
      },
      publicKey: {
        unused: 0,
        data
      }
    }, 'der').toString('base64')

    return ECDSA.formatPem(base64pem, 'PUBLIC')
  }

  toPrivateJwk () {
    if (!this.isPrivate) {
      throw new InvalidOperationError('Cannot export a private key from a public key')
    }

    let { d, x, y } = this

    return {
      kty: 'EC',
      crv: 'K-256',
      d: Converter.convert(d, 'raw', 'base64url'),
      x: Converter.convert(x, 'raw', 'base64url'),
      y: Converter.convert(y, 'raw', 'base64url'),
    }
  }

  toPublicJwk () {
    let { x, y } = this

    return {
      kty: 'EC',
      crv: 'K-256',
      x: Converter.convert(x, 'raw', 'base64url'),
      y: Converter.convert(y, 'raw', 'base64url'),
    }
  }

  toBlk () {
    if (!this.isPrivate) {
      throw new InvalidOperationError('Cannot export a private key from a public key')
    }

    let { d } = this

    return Converter.convert(d, 'raw', 'hex')
  }

  /**
   * Helper Methods
   * @ignore
   */

  static getPoint (point) {
    let hexstr = Converter.convert(point, 'raw', 'hex')
    let x = hexstr.slice(2, ((hexstr.length - 2) / 2) + 2)
    let y = hexstr.slice(((hexstr.length - 2) / 2) + 2)
    return Converter.convertObject({ x, y }, 'hex', 'raw')
  }

  static makePoint (x, y) {
    let startBuffer = Buffer.from('04', 'hex')
    return Buffer.concat([
      startBuffer,
      x,
      y
    ], startBuffer.length + x.length + y.length)
  }
}

/**
 * Export
 * @ignore
 */
module.exports = ECDSA
