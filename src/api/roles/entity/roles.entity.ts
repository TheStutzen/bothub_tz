import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  key: string
}
