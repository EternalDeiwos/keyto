/**
 * Test Dependencies
 * @ignore
 */
const cwd = process.cwd()
const path = require('path')
const chai = require('chai')
const expect = chai.expect

/**
 * Assertions
 * @ignore
 */
chai.should()

/**
 * Code Under Test
 * @ignore
 */
const keyto = require(path.join(cwd, 'src'))

/**
 * Test Consts
 * @ignore
 */
const {
  RSA: {
    RS256: {
      publicPKCS1: rsaPublicPKCS1,
      publicPKCS8: rsaPublicPKCS8,
      publicJwk: rsaPublicJwk,
      privatePKCS8: rsaPrivatePKCS8,
      privatePKCS1: rsaPrivatePKCS1,
      privateJwk: rsaPrivateJwk
    }
  },
  ECDSA: {
    K256: {
      publicPKCS1: ecPublicPKCS1,
      publicPKCS8: ecPublicPKCS8,
      publicJwk: ecPublicJwk,
      privatePKCS8: ecPrivatePKCS8,
      privatePKCS1: ecPrivatePKCS1,
      privateJwk: ecPrivateJwk,
      privateHex: ecPrivateHex
    }
  }
} = require(path.join(cwd, 'test', 'keys'))

/**
 * Tests
 */
describe('keyto', () => {

  describe('RSA', () => {

    describe('publicPKCS8', () => {

      let key
      before(() => {
        key = keyto.from(rsaPublicPKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicJwk', () => {

      let key
      before(() => {
        key = keyto.from(rsaPublicJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('privatePKCS1', () => {

      let key
      before(() => {
        key = keyto.from(rsaPrivatePKCS1, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(rsaPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(rsaPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(rsaPrivateJwk)
      })
    })

    describe('privatePKCS8', () => {

      let key
      before(() => {
        key = keyto.from(rsaPrivatePKCS8, 'pem')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(rsaPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(rsaPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(rsaPrivateJwk)
      })
    })

    describe('privateJwk', () => {

      let key
      before(() => {
        key = keyto.from(rsaPrivateJwk, 'jwk')
      })

      it('should convert to publicPKCS1', () => {
        key.toString('pem', 'public_pkcs1').should.equal(rsaPublicPKCS1)
      })

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(rsaPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(rsaPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(rsaPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(rsaPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(rsaPrivateJwk)
      })
    })
  })

  describe('ECDSA', () => {

    describe('publicPKCS8', () => {

      let key
      before(() => {
        key = keyto.from(ecPublicPKCS8, 'pem')
      })

      it('should convert to publicPKCS1')

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(ecPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(ecPublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateHex', () => {
        expect(() => key.toString('blk', 'private')).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('publicJwk', () => {

      let key
      before(() => {
        key = keyto.from(ecPublicJwk, 'jwk')
      })

      it('should convert to publicPKCS1')

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(ecPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(ecPublicJwk)
      })

      it('should not convert to privatePKCS1', () => {
        expect(() => key.toString('pem', 'private_pkcs1')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privatePKCS8', () => {
        expect(() => key.toString('pem', 'private_pkcs8')).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateJwk', () => {
        expect(() => JSON.stringify(key.toJwk('private'), null, 2)).to.throw('Cannot export a private key from a public key')
      })

      it('should not convert to privateHex', () => {
        expect(() => key.toString('blk', 'private')).to.throw('Cannot export a private key from a public key')
      })
    })

    describe('privatePKCS1', () => {

      let key
      before(() => {
        key = keyto.from(ecPrivatePKCS1, 'pem')
      })

      it('should convert to publicPKCS1')

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(ecPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(ecPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(ecPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(ecPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(ecPrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(ecPrivateHex)
      })
    })

    describe('privatePKCS8', () => {

      let key
      before(() => {
        key = keyto.from(ecPrivatePKCS8, 'pem')
      })

      it('should convert to publicPKCS1')

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(ecPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(ecPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(ecPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(ecPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(ecPrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(ecPrivateHex)
      })
    })

    describe('privateJwk', () => {

      let key
      before(() => {
        key = keyto.from(ecPrivateJwk, 'jwk')
      })

      it('should convert to publicPKCS1')

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(ecPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(ecPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(ecPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(ecPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(ecPrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(ecPrivateHex)
      })
    })

    describe('privateHex', () => {

      let key
      before(() => {
        key = keyto.from(ecPrivateHex, 'blk')
      })

      it('should convert to publicPKCS1')

      it('should convert to publicPKCS8', () => {
        key.toString('pem', 'public_pkcs8').should.equal(ecPublicPKCS8)
      })

      it('should convert to publicJwk', () => {
        JSON.stringify(key.toJwk('public'), null, 2).should.equal(ecPublicJwk)
      })

      it('should convert to privatePKCS1', () => {
        key.toString('pem', 'private_pkcs1').should.equal(ecPrivatePKCS1)
      })

      it('should convert to privatePKCS8', () => {
        key.toString('pem', 'private_pkcs8').should.equal(ecPrivatePKCS8)
      })

      it('should convert to privateJwk', () => {
        JSON.stringify(key.toJwk('private'), null, 2).should.equal(ecPrivateJwk)
      })

      it('should convert to privateHex', () => {
        key.toString('blk', 'private').should.equal(ecPrivateHex)
      })
    })
  })
})
