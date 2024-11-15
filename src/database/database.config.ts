import { DataSource } from 'typeorm'

export const pgDataSource = new DataSource({
  type: (process.env.TYPE as any) ?? 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) ?? 3306,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: process.env.DEBUG === 'true',
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci'
  }
})
