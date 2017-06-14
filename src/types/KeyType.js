'use strict'

/**
 * Module Dependencies
 * @ignore
 */
const OperationNotSupportedError = require('../OperationNotSupportedError')

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
  constructor (params) {
    this.params = params
  }

  static formatPem (base64pem, descriptor) {
    return `-----BEGIN ${descriptor} KEY-----\n`
    + base64pem.match(/.{1,64}/g).join('\n')
    + `\n-----END ${descriptor} KEY-----`
  }

  /**
   * IMPORT
   */

  fromPrivatePKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  fromPrivatePKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  fromPublicPKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  fromPublicPKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  fromJwk (key) {
    throw new OperationNotSupportedError()
  }

  fromBlk (key) {
    throw new OperationNotSupportedError()
  }

  /**
   * EXPORT
   */

  toPrivatePKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  toPrivatePKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  toPublicPKCS1 (key) {
    throw new OperationNotSupportedError()
  }

  toPublicPKCS8 (key) {
    throw new OperationNotSupportedError()
  }

  toPrivateJwk (key) {
    throw new OperationNotSupportedError()
  }

  toPublicJwk (key) {
    throw new OperationNotSupportedError()
  }

  toBlk (key) {
    throw new OperationNotSupportedError()
  }
}

/**
 * Export
 * @ignore
 */
module.exports = KeyType
