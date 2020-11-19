export interface IMessage {
  content: string
}

export interface IContent {
  type: string
  data: unknown
  ip: string
  agent: string
}
