const superTest = require('supertest')
const should = require('should')
const server = require('../bin/www')
const agent = superTest.agent(server)

describe(`test user`, () => {
  it(`test /test`, async() => {
    const result = await agent.get(`/test`)
    const {code, data} = result.body
    should.exist(data)
    data.should.equal('hello world')
  })
})