import { Router } from 'express'
const router = Router()

import validatorController, { joiObjs } from '../../../controllers/request-validation'
import productController from '../../../controllers/products'

router
  .get('/',
    validatorController.validate(joiObjs.products.list, 'query'),
    productController.getProducts
  )

export default router

