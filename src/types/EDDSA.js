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
 * EdDSA
 * @ignore
 */
class EdDSA extends KeyType {

  /**
   * IMPORT
   * @ignore
   */

  fromPrivatePKCS8 (key) {
    const PrivateKeyInfo = asn.normalize('PrivateKeyInfo')

    const info = PrivateKeyInfo.decode(key, 'der')
    const d = info.privateKey.slice(2)
    const x = this.publicKeyFromPrivate(d)

    return { d, x }
  }

  fromPublicPKCS8 (key) {
    const PublicKeyInfo = asn.normalize('PublicKeyInfo')
    const info = PublicKeyInfo.decode(key, 'der')

    return {
      x: Converter.convert(info.publicKey.data, 'hex', 'raw'),
    }
  }

  fromJwk (key) {
    let { d, x } = key

    return {
      d: Converter.convert(d, 'base64url', 'raw'),
      x: Converter.convert(x, 'base64url', 'raw'),
    }
  }

  /**
   * EXPORT
   * @ignore
   */

  toPrivatePKCS8 (key) {
    let { oid, infoVersion } = this.params
    let { d } = key

    const PrivateKeyInfo = asn.normalize('PrivateKeyInfo')
    const privateKey = this.privateKeyPadding(d)

    let base64pem = PrivateKeyInfo.encode({
      version: infoVersion,
      algorithm: {
        algorithm: oid.split('.'),
      },
      privateKey,
    }, 'der').toString('base64')

    return EdDSA.formatPem(base64pem, 'PRIVATE')
  }

  toPublicPKCS8 (key) {
    let { oid } = this.params
    let { x } = key
    let PublicKeyInfo = asn.normalize('PublicKeyInfo')

    let base64pem = PublicKeyInfo.encode({
      algorithm: {
        algorithm: oid.split('.'),
      },
      publicKey: {
        unused: 0,
        data: Converter.convert(x, 'hex', 'raw'),
      },
    }, 'der').toString('base64')

    return EdDSA.formatPem(base64pem, 'PUBLIC')
  }

  toPrivateJwk (key) {
    let { crv, kty } = this.params
    let { d, x } = key

    return {
      kty,
      crv,
      d: Converter.convert(d, 'raw', 'base64url'),
      x: Converter.convert(x, 'raw', 'base64url'),
    }
  }

  toPublicJwk (key) {
    let { crv, kty } = this.params
    let { x } = key

    return {
      kty,
      crv,
      x: Converter.convert(x, 'raw', 'base64url'),
    }
  }

  /**
   * HELPERS
   * @ignore
   */

  privateKeyPadding (d) {
    let startBuffer

    switch (this.params.crv) {
      case 'Ed25519':
        startBuffer = Buffer.from('0420', 'hex')
        break

      default:
        throw new Error(`${this.params.crv} is an invalid curve for EdDSA`)
    }

    return Buffer.concat([
      startBuffer,
      d
    ], startBuffer.length + d.length)
  }

  publicKeyFromPrivate (d) {
    switch (this.params.crv) {
      case 'Ed25519':
        const Ed = require('elliptic').eddsa
        const ed = new Ed('ed25519')
        return Buffer.from(ed.keyFromSecret(d).getPublic())

      default:
        throw new Error(`${this.params.crv} is an invalid curve for EdDSA`)
    }
  }
}

/**
 * Export
 * @ignore
 */
module.exports = EdDSA
