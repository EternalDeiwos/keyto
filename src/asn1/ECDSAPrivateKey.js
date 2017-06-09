'use strict'

module.exports = registry => {
  return function () {
    this.seq().obj(
      this.key('d').int(),
      this.key('point').octstr()
    )
  }
}
