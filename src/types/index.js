'use strict'

/**
 * Module Depdendencies
 * @ignore
 */
const SupportedKeyTypes = require('./SupportedKeyTypes')

/**
 * supportedKeyTypes
 * @ignore
 */
const supportedKeyTypes = new SupportedKeyTypes()

/**
 * RSAKeyDescriptor
 *
 * @description
 * A KeyDescriptor for RSA Keys
 *
 * @see RSA
 *
 * @typedef {Object} RSAKeyDescriptor
 */
const RSA = require('./RSA')
supportedKeyTypes.define('RSA', RSA)

/**
 * ECDSAKeyDescriptor
 *
 * @description
 * A KeyDescriptor for ECDSA Keys
 *
 * @see ECDSA
 *
 * @typedef {Object} ECDSAKeyDescriptor
 */
const ECDSA = require('./ECDSA')
supportedKeyTypes.define('EC', ECDSA)

/**
 * EDDSAKeyDescriptor
 *
 * @description
 * A KeyDescriptor for EDDSA Keys
 *
 * @see EDDSA
 *
 * @typedef {Object} EDDSAKeyDescriptor
 */
const EDDSA = require('./EDDSA')
supportedKeyTypes.define('ED', EDDSA)

/**
 * KeyDescriptor
 *
 * @typedef {(RSAKeyDescriptor|ECDSAKeyDescriptor|EDDSAKeyDescriptor)} KeyDescriptor
 *
 * @description
 * Key metadata. If the input format is 'pem' or 'jwk', this may be omitted.
 */

/**
 * Export
 * @ignore
 */
module.exports = supportedKeyTypes
