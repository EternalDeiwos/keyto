'use strict'

/**
 * Module Depdendencies
 * @ignore
 */
const SupportedAsnTypes = require('./SupportedAsnTypes')

/**
 * supportedAsnTypes
 * @ignore
 */
const supportedAsnTypes = new SupportedAsnTypes()

/**
 * General Types
 * @ignore
 */
supportedAsnTypes.define('Version', require('./Version'))
supportedAsnTypes.define('OtherPrimeInfos', require('./OtherPrimeInfos'))
supportedAsnTypes.define('AlgorithmIdentifier', require('./AlgorithmIdentifier'))
supportedAsnTypes.define('PrivateKeyInfo', require('./PrivateKeyInfo'))
supportedAsnTypes.define('PublicKeyInfo', require('./PublicKeyInfo'))

/**
 * RSA Types
 * @ignore
 */
supportedAsnTypes.define('RSAPrivateKey', require('./RSAPrivateKey'))
supportedAsnTypes.define('RSAPublicKey', require('./RSAPublicKey'))

/**
 * ECDSA Types
 * @ignore
 */
supportedAsnTypes.define('ECDSAPrivateKey', require('./ECDSAPrivateKey'))
supportedAsnTypes.define('ECDSAPublicKey', require('./ECDSAPublicKey'))

/**
 * Export
 * @ignore
 */
module.exports = supportedAsnTypes
