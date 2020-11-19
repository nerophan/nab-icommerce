import 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

import app from '../src'

describe('First test', () => {
  it('should return true', async done => {
    const res = await chai.request(app)
      .get('/v1/products')
      .send()
    expect(res).to.not.be.empty
  })
})