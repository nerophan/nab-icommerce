import { Router } from 'express'
const router = Router()

import wishlistRoutes from './wishlists'

router.use('/wishlists', wishlistRoutes)

export default router

