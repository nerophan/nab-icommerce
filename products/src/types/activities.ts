export enum TYPES {
  SEARCH_PRODUCTS,
  VIEW_PRODUCT,
}

export interface IActivity {
  type: TYPES
  data?: unknown
  ip?: string
  agent?: string
}
