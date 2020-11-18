import { DEFAULT_LIMIT } from '../constants/query'

export const getFilterAndPaging = query => {
  let {
    filter,
    sort
  } = query
  const {
    page = 1,
    limit = DEFAULT_LIMIT,
  } = query
  if (filter) {
    try {
      filter = JSON.parse(filter)
    } catch (err) {
      filter = {}
    }
  } else {
    filter = {}
  }
  if (sort) {
    try {
      sort = JSON.parse(sort)
    } catch (err) {
      sort = undefined
    }
    if (sort) {
      sort = Object.entries(sort)
    }
  } else {
    sort = undefined
  }
  return {
    filter,
    page: Number(page) < 1 ? 1 : Number(page), // string will cause error db query
    limit: Number(limit),
    sort,
  }
}
