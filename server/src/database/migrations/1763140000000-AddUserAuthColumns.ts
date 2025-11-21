import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAuthColumns1763140000000 implements MigrationInterface {
  name = 'AddUserAuthColumns1763140000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying(255)`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refresh_token_hash" character varying(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token_hash"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
  }
}
