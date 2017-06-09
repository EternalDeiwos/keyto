'use strict'

/**
 * PEM
 * @ignore
 */
const privatePem = `-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIGL+5sun5HcUA38BQrImqe1rf8wW45SjSdK8OUC90kRtoAcGBSuBBAAK
oUQDQgAE1EtMpqpgipSE1aOfs0gYj/sSv86VDbuBuR/VPpr2F6ZXqqZEhVCEhann
W+64lXnKlR0c69v3A+DOjmF5R9FU5w==
-----END EC PRIVATE KEY-----`
const publicPem = `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE1EtMpqpgipSE1aOfs0gYj/sSv86VDbuB
uR/VPpr2F6ZXqqZEhVCEhannW+64lXnKlR0c69v3A+DOjmF5R9FU5w==
-----END PUBLIC KEY-----`

/**
 * Hex String
 * @ignore
 */
const privateHex = `62fee6cba7e47714037f0142b226a9ed6b7fcc16e394a349d2bc3940bdd2446d`
const publicHex = `04d44b4ca6aa608a9484d5a39fb348188ffb12bfce950dbb81b91fd53e9af617a657aaa64485508485a9e75beeb89579ca951d1cebdbf703e0ce8e617947d154e7`

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
