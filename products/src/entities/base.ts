interface BaseResponse {
  error: {
    status: number,
    message: string,
  },
  data: unknown,
  error_code: number
}

const response = (data: unknown, message = 'Success', status: 0 | 1 = 1, errorCode = undefined): BaseResponse => {
  const res = {
    error: {
      status,
      message,
    },
    data,
    error_code: errorCode,
  }
  return res
}

export default response
