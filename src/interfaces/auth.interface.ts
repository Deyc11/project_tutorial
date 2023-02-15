import { JwtSecretRequestType } from '@nestjs/jwt'
import { User } from 'entitites/user.entity'
import { Request } from 'express'

export interface TokenPayload {
  name: string
  sub: string
  type: JwtType
}

export interface RequesWithUser extends Request {
  user: User
}

export enum JwtType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum CookieType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
