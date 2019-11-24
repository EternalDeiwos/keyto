'use strict'

/**
 * PEM
 * @ignore
 */
const privatePKCS8 = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIA1zTpIkMpFC2KRrjUzT0d68oxgoIqfMuX4Q6Y3xgNQR
-----END PRIVATE KEY-----`
const publicPKCS8 = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA7xpkqtl+XQwlGVg/ScYcFcCiAiJvXcs8NTniluel5qA=
-----END PUBLIC KEY-----`

/**
 * JWK
 * @ignore
 */
const privateJwk = `{
  "kty": "OKP",
  "crv": "Ed25519",
  "d": "DXNOkiQykULYpGuNTNPR3ryjGCgip8y5fhDpjfGA1BE",
  "x": "7xpkqtl-XQwlGVg_ScYcFcCiAiJvXcs8NTniluel5qA"
}`
const publicJwk = `{
  "kty": "OKP",
  "crv": "Ed25519",
  "x": "7xpkqtl-XQwlGVg_ScYcFcCiAiJvXcs8NTniluel5qA"
}`

/**
 * Export
 * @ignore
 */
module.exports = {
  privatePKCS8,
  publicPKCS8,
  privateJwk,
  publicJwk,
}
