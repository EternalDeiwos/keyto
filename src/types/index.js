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

/**
 * KeyDescriptor
 *
 * @typedef {(RSAKeyDescriptor|ECDSAKeyDescriptor|EDDSAKeyDescriptor)} KeyDescriptor
 *
 * @description
 * Key metadata. If the input format is 'pem', this may be omitted.
 */

/**
 * Export
 * @ignore
 */
module.exports = supportedKeyTypes
