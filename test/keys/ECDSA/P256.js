'use strict'

/**
 * PEM
 * @ignore
 */
const privatePem = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIN7doxnaLI4GtVJ9+X5sHqFjJIA5jWLB3mKZE2O9O1mBoAoGCCqGSM49
AwEHoUQDQgAEbag3R0FTUvlLJGEM7zEhY2IGJgoEN4Q4UA7eR5Uh7BEIzXBGuT/3
S9cNXKa6mWLTLIcBxEFVLcx1AVQJKrkFXQ==
-----END EC PRIVATE KEY-----`
const publicPem = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEbag3R0FTUvlLJGEM7zEhY2IGJgoE
N4Q4UA7eR5Uh7BEIzXBGuT/3S9cNXKa6mWLTLIcBxEFVLcx1AVQJKrkFXQ==
-----END PUBLIC KEY-----`

/**
 * Hex String
 * @ignore
 */
const privateHex = `00dedda319da2c8e06b5527df97e6c1ea1632480398d62c1de62991363bd3b5981`
const publicHex = `046da83747415352f94b24610cef3121636206260a04378438500ede479521ec1108cd7046b93ff74bd70d5ca6ba9962d32c8701c441552dcc750154092ab9055d`

/**
 * JWK
 * @ignore
 */
const privateJwk = ``
const publicJwk = ``

/**
 * Export
 * @ignore
 */
module.exports = {
  privatePem,
  publicPem,
  privateHex,
  publicHex,
  privateJwk,
  publicJwk,
}
