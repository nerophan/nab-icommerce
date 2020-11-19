import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
// import chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

import app from '../src'

describe('GET: /v1/products', () => {
  it('Without query', async () => {
    console.log('chai', chai)
    const res = await chai.request(app)
      .get('/v1/products')
    expect(res).to.not.be.empty
    expect(res).to.have.status(200)
    expect(res.body.data).to.be.an('array')
    console.log('res', res)
  })
})