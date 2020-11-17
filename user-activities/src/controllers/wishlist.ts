import { Request, Response, NextFunction } from 'express'
import base from '../entities/base'
import { error_codes as ERROR_CODES } from '../constants'
import {
  services as ServiceTypes,
} from '../types'
import db from '../db'
import { common as commonUtils } from '../utils'

interface IGetWishlistsState {
  user: ServiceTypes.Auth.VerifyTokenData
}
const getWishlists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    user
  } = <IGetWishlistsState>req.state
  const {
    filter,
    page,
    limit,
    sort,
  } = commonUtils.getFilterAndPaging(req.query)
  let wishlists
  try {
    wishlists = await db.Wishlist.findAll({
      where: {
        user: user.id,
        ...filter,
      },
      offset: (page - 1) * limit,
      limit,
      order: sort,
    })
  } catch (err) {
    const body = base(0, err.message, 0, ERROR_CODES.DB_QUERY)
    res.send(body)
    return
  }
  const body = base(wishlists)
  res.send(body)
}

const getWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    user
  } = <IGetWishlistsState>req.state
  const {
    id
  } = req.params
  let wishlist
  try {
    wishlist = await db.Wishlist.findOne({
      where: {
        id,
        user: user.id,
      },
      include: [{
        model: db.WishlistItem,
        as: 'items',
        required: false
      }],
    })
  } catch (err) {
    const body = base(0, err.message, 0, ERROR_CODES.DB_QUERY)
    res.send(body)
    return
  }
  const body = base(wishlist)
  res.send(body)
}

interface ICreateWishList {
  title: string,
  description?: string,
}
const createWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    user
  } = <IGetWishlistsState>req.state
  const {
    title,
    description,
  } = <ICreateWishList>req.body
  let wishlist
  try {
    wishlist = await db.Wishlist.create({
      user: user.id,
      title,
      description
    })
  } catch (err) {
    const body = base(0, err.message, 0, ERROR_CODES.DB_QUERY)
    res.send(body)
    return
  }
  const body = base(wishlist)
  res.send(body)
}

interface ICreateWishListItem {
  wishlist: number,
  items: Array<{ name: string }>
}
const createWishlistItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    user
  } = <IGetWishlistsState>req.state
  const {
    wishlist: wishlistId,
    items,
  } = <ICreateWishListItem>req.body
  // check if wishlist exists
  let wishlist
  try {
    wishlist = await db.Wishlist.findOne({
      where: {
        id: wishlistId,
        user: user.id,
      }
    })
  } catch (err) {
    const body = base(0, err.message, 0, ERROR_CODES.DB_QUERY)
    res.send(body)
    return
  }
  if (!wishlist) {
    const body = base(0, 'Wishlist not found', 0, ERROR_CODES.NOT_FOUND)
    res.send(body)
    return
  }
  // add item
  let createdItems
  try {
    const payload = items.map(i => ({
      name: i.name,
      wishlist: wishlist.id,
    }))
    createdItems = await db.WishlistItem.bulkCreate(payload)
  } catch (err) {
    const body = base(0, err.message, 0, ERROR_CODES.DB_QUERY)
    res.send(body)
    return
  }
  const body = base(createdItems)
  res.send(body)
}

interface IUpdateWishList {
  title: string,
  description?: string,
}
const updateWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    user
  } = <IGetWishlistsState>req.state
  const {
    id
  } = req.params
  const {
    title,
    description,
  } = <IUpdateWishList>req.body
  let updatedWishlist
  try {
    const res = await db.Wishlist.update({
      title,
      description,
    }, {
      where: {
        id,
        user: user.id,
      },
      returning: true
    })
    if (res[0] === 1) updatedWishlist = res[1][0]
  } catch (err) {
    const body = base(0, err.message, 0, ERROR_CODES.DB_QUERY)
    res.send(body)
    return
  }
  const body = base(updatedWishlist)
  res.send(body)
}

interface IUpdateWishlistItem {
  name: string,
}
const updateWishlistItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    user
  } = <IGetWishlistsState>req.state
  const {
    id
  } = req.params
  const {
    name,
  } = <IUpdateWishlistItem>req.body
  // find item
  let item
  try {
    item = await db.WishlistItem.findOne({
      where: { id },
      include: [
        {
          model: db.Wishlist,
          where: {
            user: user.id
          }
        }
      ]
    })
  } catch (err) {
    const body = base(0, err.message, 0, ERROR_CODES.DB_QUERY)
    res.send(body)
    return
  }
  if (!item) {
    const body = base(0, 'Item not found', 0, ERROR_CODES.NOT_FOUND)
    res.send(body)
    return
  }
  item.name = name || item.name
  await item.save()
  const body = base(item)
  res.send(body)
}

class Wishlist {
  getWishlists = getWishlists
  getWishlist = getWishlist
  createWishlist = createWishlist
  createWishlistItem = createWishlistItem
  updateWishlist = updateWishlist
  updateWishlistItem = updateWishlistItem
}

export default new Wishlist() // use class for unit testing