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

// RSA
const RSA = require('./RSA')
supportedKeyTypes.define(RSA, 'RSA', [ 1, 2, 840, 113549, 1, 1, 1 ], ['RS256'])

// ECDSA
const ECDSA = require('./ECDSA')
supportedKeyTypes.define(ECDSA, 'EC', [
  [ 1, 2, 840, 10045, 2, 1 ]
], ['K-256'])

// EDDSA
const EDDSA = require('./EDDSA')
supportedKeyTypes.define(EDDSA, 'ED')

/**
 * Export
 * @ignore
 */
module.exports = supportedKeyTypes
