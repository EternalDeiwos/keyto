'use strict'

/**
 * PEM
 * @ignore
 */
const privatePKCS8 = `-----BEGIN PRIVATE KEY-----
MEcCAQAwBQYDK2VxBDsEOca8VS4qnk/K/W+UUnZ7hINXJA1UeKEh2vGNn4cJ8C4o
ALXAI5x3e8L97HY7WCyXeP+8J0p6o3pVOw==
-----END PRIVATE KEY-----`
const publicPKCS8 = `-----BEGIN PUBLIC KEY-----
MEMwBQYDK2VxAzoAEBWe85OlrdIQDnkQYYh1WMJ4sc5s31oGrjXvYoF4gbK6b2Ex
2BktgDitJExXkTulF7BIKTcyO6GA
-----END PUBLIC KEY-----`

/**
 * JWK
 * @ignore
 */
const privateJwk = `{
  "kty": "OKP",
  "crv": "Ed448",
  "x": "EBWe85OlrdIQDnkQYYh1WMJ4sc5s31oGrjXvYoF4gbK6b2Ex2BktgDitJExXkTulF7BIKTcyO6GA"
}`
const publicJwk = `{
  "kty": "OKP",
  "crv": "Ed448",
  "x": "EBWe85OlrdIQDnkQYYh1WMJ4sc5s31oGrjXvYoF4gbK6b2Ex2BktgDitJExXkTulF7BIKTcyO6GA"
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
