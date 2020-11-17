import { Router } from 'express'
const router = Router()

import publicRoutes from './public'

router.use('/', publicRoutes)

export default router
