import { Request, Response, NextFunction } from 'express'
import base from '../entities/base'
import db from '../db'
import { common as commonUtils } from '../utils'

const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    filter,
    page,
    limit,
    sort,
  } = commonUtils.getFilterAndPaging(req.query)
  const body = base({
    filter,
    page,
    limit,
    sort,
  })
  let products
  try {
    products = await db.products.create({
      name: 'x'
    })
  } catch (err) {
    console.error(err)
    res.send({ err })
    return
  }
  res.send(products)
}

class Products {
  getProducts = getProducts
}

export default new Products() // use class for unit testing