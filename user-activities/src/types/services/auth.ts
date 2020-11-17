/**
 * Types for auth service
 */
interface Response {
  error: {
    status: number,
    message: string
  },
  data: unknown
}
export interface VerifyTokenRequest {
  token: string
}

export interface VerifyTokenData {
  id: string,
  email: string,
  fullname: string,
  createdAt: Date,
  updatedAt: Date,
  iat: number,
  exp: number
}
export interface VerifyTokenResponse extends Response {
  data: VerifyTokenData
}
