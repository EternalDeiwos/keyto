'use strict'

/**
 * SupportedKeyTypes
 * @ignore
 */
class SupportedKeyTypes {

  /**
   * constructor
   *
   * @class SupportedKeyTypes
   *
   * @description
   * A registry for supported asn key types
   */
  constructor () {
    Object.defineProperty(this, '_ktyRegistry', { value: {}, enumerable: true })
    Object.defineProperty(this, '_oidRegistry', { value: {}, enumerable: true })
    Object.defineProperty(this, '_algRegistry', { value: {}, enumerable: true })
  }

  get types () {
    return this._ktyRegistry
  }

  get oids () {
    return this._oidRegistry
  }

  get algs () {
    return this._algRegistry
  }

  define (cls, kty, oids, algs) {
    this._ktyRegistry[kty] = cls

    if (typeof oids === 'string') {
      this._oidRegistry[oids] = cls

    } else if (Array.isArray(oids)) {
      if (oids.length === 0) {
        throw new Error('Invalid OID')

      } else if (Array.isArray(oids[0])) {
        oids.map(oid => oid.join('.'))
          .forEach(oid => this._oidRegistry[oid] = cls)

      } else {
        this._oidRegistry[oids.join('.')] = cls
      }
    }

    if (typeof algs === 'string') {
      this._algRegistry[algs] = cls
    } else if (Array.isArray(algs)) {
      algs.forEach(alg => this._algRegistry[alg] = cls)
    }
  }

  normalizeKty (kty) {
    return this.types[kty]
  }

  normalizeAlg (alg) {
    return this.algs[alg]
  }

  normalizeOid (oid) {
    if (Array.isArray(oid)) {
      oid = oid.join('.')
    }

    return this.oids[oid]
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SupportedKeyTypes
