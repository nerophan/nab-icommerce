import request from 'request-promise'

import { Auth } from '../types/services'

import config from '../config'

const AUTH_URL = config.services.auth.url

export const verifyToken = (data: Auth.VerifyTokenRequest): Promise<Auth.VerifyTokenResponse> => {
  return request({
    uri: `${AUTH_URL}/priv/v1/users/verify_token`,
    method: 'POST',
    body: {
      token: data.token,
    },
    json: true,
  })
}
