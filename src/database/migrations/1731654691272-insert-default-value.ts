import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertDefaultValue1731654691272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "users" ("login", "email", "password", "balance", "roleId", "dateReg")
VALUES ('superadmin', 'superadmin@example.com', '$2b$12$v4Tp3rFZlqMEEykqbvoV3OSW0GFwzQtaGBXCfnmAvej2cU5dzK7Eu', 10000, 1, CURRENT_TIMESTAMP), ('admin', 'admin@example.com', '$2b$12$v4Tp3rFZlqMEEykqbvoV3OSW0GFwzQtaGBXCfnmAvej2cU5dzK7Eu', 10000, 2, CURRENT_TIMESTAMP), ('stutzen', 'stutzen@example.com', '$2b$12$v4Tp3rFZlqMEEykqbvoV3OSW0GFwzQtaGBXCfnmAvej2cU5dzK7Eu', 1000, 3, CURRENT_TIMESTAMP);
      `)

    await queryRunner.query(`
        INSERT INTO "roles" ("key")
        VALUES
          ('superadmin'),
          ('admin'),
          ('client');
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "users"
      WHERE "login" IN ('superadmin', 'admin', 'stutzen');
    `)

    await queryRunner.query(`
      DELETE FROM "roles"
      WHERE "key" IN ('superadmin', 'admin', 'client');
    `)
  }
}
