import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entitites/user.entity'
import Logging from 'library/Logging'
import { UsersService } from 'users/users.service'
import { compareHash, hash } from 'utils/bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async validateUser(email: string, password: string): Promise<User> {
    Logging.info('Validating user...')
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      throw new BadRequestException('invalid credentials')
    }
    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('invalid credentials')
    }

    Logging.info('user is valid.')
    return user
  }

  async register(registeruserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await hash(registeruserDto.password)
    return this.usersService.create({
      role_id: null,
      ...registeruserDto,
      password: hashedPassword,
    })
  }
}
