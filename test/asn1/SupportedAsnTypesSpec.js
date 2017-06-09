/**
 * Test Dependencies
 * @ignore
 */
const cwd = process.cwd()
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

/**
 * Assertions
 * @ignore
 */
chai.use(chaiAsPromised)
const expect = chai.expect
chai.should()

/**
 * Code Under Test
 * @ignore
 */
const SupportedAsnTypes = require(path.join(cwd, 'src', 'asn1', 'SupportedAsnTypes'))
const supportedAsnTypes = require(path.join(cwd, 'src', 'asn1'))

/**
 * Test Consts
 * @ignore
 */

/**
 * Tests
 */
describe('SupportedAsnTypes', () => {

})
