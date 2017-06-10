'use strict'

/**
 * Dependencies
 * @ignore
 */

/**
 * Module Dependencies
 * @ignore
 */
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
 * Available formats: jwk, pem
 */

/**
 * BufferFormat
 *
 * @typedef {String} BufferFormat
 *
 * @description
 * Available formats: raw, uint8_array
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
   */
  constructor () {

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
   * @param  {(Object|String|Uint8Array|Buffer)} [data.privateKey]
   * @param  {(Object|String|Uint8Array|Buffer)} [data.publicKey]
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
