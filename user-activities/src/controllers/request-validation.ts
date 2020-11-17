import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { error_codes as ERROR_CODES } from '../constants'
import base from '../entities/base'

const validate = (validator, path: 'body' | 'query') => (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let obj
  if (path === 'body') {
    obj = req.body
  } else if (path === 'query') {
    obj = req.query
  }
  console.log(req.body)
  if (obj) {
    const vldRs = validator.validate(obj)
    console.log(vldRs.error)
    if (vldRs.error) {
      const response = base(null, vldRs.error.message, 0, ERROR_CODES.JOI_VALIDATION)
      next(response)
      return
    }
    next()
    return
  }
  next()
}

export const joiObjs = {
  wishlist: {
    get: Joi.object({
      filter: Joi.string(),
      page: Joi.number(),
      limit: Joi.number(),
    }),
    create: Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
    }),
    addItem: Joi.object({
      wishlist: Joi.number().required(),
      items: Joi.array().items(Joi.object({
        name: Joi.string().required(),
      })).required(),
    }),
    edit: Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
    }),
    editItem: Joi.object({
      name: Joi.string().required(),
    }),
  },
}

export default {
  validate,
}
