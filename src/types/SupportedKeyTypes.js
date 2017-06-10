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
    Object.defineProperty(this, '_registry', { value: {} })
  }

  get registry () {
    return this._registry
  }

  define (name, cls) {
    this._registry[name] = cls
  }

  normalize (name) {
    return this.registry[name]
  }
}

/**
 * Export
 * @ignore
 */
module.exports = SupportedKeyTypes
