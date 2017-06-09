'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
const RSA = require('./RSA')
const ECDSA = require('./ECDSA')
const EDDSA = require('./EDDSA')

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
 * Available formats: jwk, pem
 */

/**
 * BufferFormat
 *
 * @typedef {String} BufferFormat
 *
 * @description
 * Available formats: raw
 */

/**
 * ObjectFormat
 *
 * @typedef {String} ObjectFormat
 *
 * @description
 * Available formats: jwk, hex, base64, base64url
 */

/**
 * KeyDescriptor
 *
 * @typedef {(RSAKeyDescriptor|ECDSAKeyDescriptor|EDDSAKeyDescriptor)} KeyDescriptor
 *
 * @description
 * Key metadata. If the input format is 'pem', this may be omitted.
 */

/**
 * RSAKeyDescriptor
 *
 * @description
 * A KeyDescriptor for RSA Keys
 *
 * @typedef {Object} RSAKeyDescriptor
 */

/**
 * ECDSAKeyDescriptor
 *
 * @description
 * A KeyDescriptor for ECDSA Keys
 *
 * @typedef {Object} ECDSAKeyDescriptor
 */

/**
 * EDDSAKeyDescriptor
 *
 * @description
 * A KeyDescriptor for EDDSA Keys
 *
 * @typedef {Object} EDDSAKeyDescriptor
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
   * @param {String} [scum]
   */
  constructor (scum) {

  }

  /**
   * from
   *
   * @description
   * Import a key
   *
   * @example <caption>Decode PEM and convert to JWK</caption>
   * const pem = require('@eternaldeiwos/pem')
   *
   * // Get data
   * let pem = getKeyPEMStringSomehow()
   * let jwk = getKeyJWKSomehow()
   *
   * // Load and convert
   * let key = pem.from({ publicKey: pem, format: 'pem' })
   * assertEqual(jwk, key.to('jwk'))
   *
   * @throws
   * If both publicKey and privateKey are omitted.
   *
   * @throws
   * If format is not 'pem' and type is omitted.
   *
   * @param  {Object} data
   * @param  {(String|Buffer)} [data.privateKey]
   * @param  {(String|Buffer)} [data.publicKey]
   * @param  {KeyDescriptor} [data.type]
   * @param  {(SerializableFormat|BufferFormat)} data.format
   * @return {Key}
   */
  static from (data) {

  }

  /**
   * to
   *
   * @description
   * Convert a key to the specified format
   *
   * @param  {ObjectFormat} [format=jwk]
   * @return {(JWK|Object)}
   */
  to (format) {

  }

  /**
   * toString
   *
   * @description
   * Serialize a key to the specified format
   *
   * @param  {SerializedFormat} [format=pem]
   * @return {String}
   */
  toString(format) {

  }

}

/**
 * Export
 * @ignore
 */
module.exports = Key
