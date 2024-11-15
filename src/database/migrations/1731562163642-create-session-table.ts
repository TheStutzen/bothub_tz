import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSessionTable1731562163642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "sessions" (
        "sid" VARCHAR(255) NOT NULL,
        "session" TEXT NOT NULL,
        "expires" INTEGER DEFAULT NULL,
        PRIMARY KEY ("sid")
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` DROP TABLE "sessions" `)
  }
}
