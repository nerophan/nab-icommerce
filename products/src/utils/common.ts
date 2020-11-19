import { DEFAULT_LIMIT } from '../constants/query'

interface IQuery {
  filter?: string
  sort?: string
  page?: string
  limit?: string
}
interface IQueryResponseFilter {
  price?: number
  brand?: string
  color?: string
  name?: string
}
interface IQueryResponse {
  filter: IQueryResponseFilter
  sort: string
  page: number
  limit: number
}
export const getFilterAndPaging = (query: IQuery): IQueryResponse => {
  const {
    filter,
    sort,
    page = 1,
    limit = DEFAULT_LIMIT,
  } = query
  let objFilter: IQueryResponseFilter = {}
  let objSort
  if (filter) {
    try {
      objFilter = JSON.parse(filter)
    } catch (err) {
      objFilter = {}
    }
  }
  if (sort) {
    try {
      objSort = JSON.parse(sort)
    } catch (err) {
      objSort = undefined
    }
    if (objSort) {
      objSort = Object.entries(objSort)
    }
  } else {
    objSort = undefined
  }
  const result: IQueryResponse = {
    filter: objFilter,
    page: Number(page) < 1 ? 1 : Number(page), // string will cause error db query
    limit: Number(limit),
    sort: objSort,
  }
  return result
}
