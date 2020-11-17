import { Request, Response, NextFunction } from 'express'

import { error_codes as ERROR_CODES } from '../constants'
import base from '../entities/base'
import { auth as authService } from '../services'

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization
  if (!token) {
    const body = base(null, 'Missing Token', 0, ERROR_CODES.BAD_REQUEST)
    res.send(body)
    return
  }
  let response
  try {
    response = (await authService.verifyToken({ token })).data
  } catch (err) {
    console.error('verifyToken', err)
    const body = base(null, 'Invalid token', 0, ERROR_CODES.THIRD_PARTY)
    res.send(body)
    return
  }
  req.state = {
    user: response
  }
  next()
}

export default {
  auth,
}
