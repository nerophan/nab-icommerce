export enum TYPES {
  SEARCH_PRODUCTS,
  VIEW_PRODUCT,
}

export interface IActivity {
  type: string
  data?: unknown
  ip?: string
  agent?: string
}
