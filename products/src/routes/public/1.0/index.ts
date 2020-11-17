import { Router } from 'express'
const router = Router()

import productRoutes from './products'

router.use('/products', productRoutes)

export default router

