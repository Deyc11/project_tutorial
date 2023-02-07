import { Column, Entity } from 'typeorm'
import { Exclude } from 'class-transformer'
import { Base } from './base.entity'

@Entity()
export class User extends Base {
  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  first_name: string

  @Column({ unique: true })
  last_name: string

  @Column({ nullable: true })
  avatar: string

  @Column({ unique: true })
  @Exclude()
  password: string

  @Column({ unique: true, default: null })
  @Exclude()
  refresh_token: string
}
