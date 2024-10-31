import { Roles } from "../types"

export interface IToken {
  iat: number
  sub: string
  roles: {
    authority: string
  }
}

export interface IUser {
  token: string
  email: string
  name: string
  id: string
}
export interface IUserLogin {
  login: string
  password: string
}

export type IRegisterUser = Omit<IUser, "company" | "id" | "role"> & {
  password: string
}

export interface GenericResponse {
  status: string
  message: string
}

export interface ILoginResponse {
  token: string
  email: string
  name: string
  id: string
}
