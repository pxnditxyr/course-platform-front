
export interface IAuthResponse {
  token: string
  user: IAuthUser
}

export interface IAuthUser {
  id: string
  email: string
  name: string
  paternalSurname: string
  maternalSurname: string
  role: 'ADMIN' | 'USER'
}
