import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { User } from 'entitites/user.entity'
import { Request } from 'express'
import { TokenPayload } from 'interfaces/auth.interface'
import { UsersService } from 'users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.acces_token
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }
  async validate(payload: TokenPayload): Promise<User> {
    return this.userService.findById(payload.sub)
  }
}
