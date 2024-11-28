import { ROLES } from "../constants"

export type DefType = {
  active: boolean
  id: number
  name: string
}

export interface Company extends DefType { }

export interface IError {
  code: number
  moreInfo: string
  developerMessage: string
  status: number
  messages: string[]
}

export interface Pagination<T> {
  meta: {
    page: number
    limit: number
    total: number
    last: boolean
    last_page: number
  }
  content: T[]
}

export interface User {
  name: string
  company: Company
}

export interface GetApiParams {
  id?: number
  page: number
  limit: number
  filter?: string
}

export type Roles = (typeof ROLES)[number];
