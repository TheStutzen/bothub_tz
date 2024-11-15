import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'sessions' })
export class Sessions {
  @PrimaryColumn({
    unique: true,
    type: 'varchar',
    length: 255,
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci'
  })
  sid: string

  @Column({
    type: 'text',
    nullable: false,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci'
  })
  session: string

  @Column({ type: 'int', width: 11, nullable: true })
  expires: number
}
