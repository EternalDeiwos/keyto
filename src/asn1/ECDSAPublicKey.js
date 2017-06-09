'use strict'

module.exports = registry => {
  return function () {
    this.seq().obj(
      this.key('point').octstr()
    )
  }
}
