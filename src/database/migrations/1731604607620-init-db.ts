import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitDb1731604607620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "userId" SERIAL PRIMARY KEY,
        "login" VARCHAR(255) UNIQUE NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "balance" DECIMAL(10, 4) DEFAULT 0 NOT NULL,
        "roleId" SMALLINT DEFAULT 3 NOT NULL,
        "dateReg" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await queryRunner.query(`
      CREATE TABLE "roles" (
        "id" SERIAL PRIMARY KEY,
        "key" VARCHAR(255) UNIQUE NOT NULL
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users";`)
    await queryRunner.query(`DROP TABLE IF EXISTS "roles";`)
  }
}
