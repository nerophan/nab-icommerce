import { Request, Response, NextFunction } from 'express'
import base from '../entities/base'
import db from '../db'
import { common as commonUtils } from '../utils'
import { QueryCursor } from 'mongoose'

const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    filter,
    page,
    limit,
    sort,
  } = commonUtils.getFilterAndPaging(req.query)
  const query: {
    price?: number,
    brand?: string,
    color?: string,
    $text?: { $search: string }
  } = {}
  if (filter.price) query.price = filter.price
  if (filter.brand) query.brand = filter.brand
  if (filter.color) query.color = filter.color
  if (filter.name) query.$text = { $search: filter.name }
  let products
  try {
    products = await db.products.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sort)
    products.length
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