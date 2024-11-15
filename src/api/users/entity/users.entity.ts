import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({ unique: true })
  login: string

  @Column()
  email: string

  @Column()
  password: string

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  balance: number

  @Column()
  roleId: number

  @Column()
  dateReg: Date
}
