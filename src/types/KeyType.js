'use strict'

/**
 * Dependencies
 * @ignore
 */
const spawn = require('child_process').spawnSync

/**
 * Module Dependencies
 * @ignore
 */
const OperationNotSupportedError = require('../OperationNotSupportedError')
const InvalidOperationError = require('../InvalidOperationError')

/**
 * KeyType
 * @ignore
 */
class KeyType {

  /**
   * constructor
   *
   * @class KeyType
   *
   * @description
   * Abstract KeyType class
   */
  constructor (data) {
    Object.assign(this, data)
  }

  static formatPem (base64pem, descriptor) {
    return `-----BEGIN ${descriptor} KEY-----\n`
    + base64pem.match(/.{1,64}/g).join('\n')
    + `\n-----END ${descriptor} KEY-----`
  }

  get publicKey () {
    // Can only get public key using the private key
    if (!this.isPrivate) {
      return new InvalidOperationError()
    }

    // Get Private Key in PEM form
    let privateKey = this.toPKCS8()
    let args = this.constructor.opensslRetrievePublicKeyArgs

    // Call out to OpenSSL
    let result
    try {
      result = spawn('openssl', args, {
        encoding: 'utf8',
        timeout: 1000,
        input: privateKey,
        maxBuffer: 10000
      })
    } catch (error) {
      throw new InvalidOperationError('OpenSSL required to retrieve public key')
    }

    // Get output and check status
    let { stdout, status, error } = result
    if (status !== 0) {
      throw new Error(error)
    }

    return stdout
  }

  static get oid () {
    throw new OperationNotSupportedError()
  }

  static get parameters () {
    throw new OperationNotSupportedError()
  }

  static get opensslRetrievePublicKeyArgs () {
    throw new OperationNotSupportedError()
  }

  static fromPKCS8 (base64pem) {
    throw new OperationNotSupportedError()
  }

  static fromPKCS1 (base64pem) {
    throw new OperationNotSupportedError()
  }

  static fromPublicPem (base64pem) {
    throw new OperationNotSupportedError()
  }

  static fromHex (hex, type) {
    throw new OperationNotSupportedError()
  }

  static fromJwk (jwk) {
    throw new OperationNotSupportedError()
  }

  get isPrivate () {
    throw new OperationNotSupportedError()
  }

  toPKCS8 () {
    throw new OperationNotSupportedError()
  }

  toPKCS1 () {
    throw new OperationNotSupportedError()
  }

  toPublicPem () {
    throw new OperationNotSupportedError()
  }

  toHex () {
    throw new OperationNotSupportedError()
  }

  toJwk () {
    throw new OperationNotSupportedError()
  }
}

/**
 * Export
 * @ignore
 */
module.exports = KeyType
