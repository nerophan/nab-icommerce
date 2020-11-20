import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
// import chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

import app from '../src'
import { Product } from '../src/db/models/products'

let productId
describe('GET: /v1/products', () => {
  it('Without query', async () => {
    const res = await chai.request(app)
      .get('/v1/products')
    expect(res).to.not.be.empty
    expect(res).to.have.status(200)
    expect(res.body.data).to.be.an('array')
    if (res.body.data[0]) {
      productId = res.body.data[0]._id
    }
  })
  it('Filter color', async () => {
    const color = 'black'
    const filter = {
      color,
    }
    const res = await chai.request(app)
      .get('/v1/products')
      .query({
        filter: JSON.stringify(filter),
      })
    expect(res).to.not.be.empty
    expect(res).to.have.status(200)
    expect(res.body.data).to.be.an('array')
    res.body.data.forEach(p => {
      expect(p).to.have.property('color', color)
    })
  })
})

describe('GET: /v1/products/:id', () => {
  it('Product should exist', async () => {
    const res = await chai.request(app)
      .get(`/v1/products/${productId}`)
    expect(res).to.not.be.empty
    expect(res).to.have.status(200)
    expect(res.body.data).to.be.an('object')
    expect(res.body.data).to.have.property('_id', productId)
  })
  it('Product should not exists', async () => {
    const fakeProductId = '5f2ba05d2223342f375f35c6'
    const res = await chai.request(app)
      .get(`/v1/products/${fakeProductId}`)
    expect(res).to.not.be.empty
    expect(res).to.have.status(200)
    expect(res.body.data).to.be.null
  })
})