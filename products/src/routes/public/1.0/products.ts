import { Router } from 'express'
const router = Router()

import validatorController, { joiObjs } from '../../../controllers/request-validation'
import productController from '../../../controllers/products'
import messageQueueController from '../../../controllers/message-queue'

router
  .get('/',
    validatorController.validate(joiObjs.products.list, 'query'),
    productController.getProducts,
    messageQueueController.sendActivityMessage
  )
  .get('/:id',
    productController.getProduct,
    messageQueueController.sendActivityMessage
  )

export default router

