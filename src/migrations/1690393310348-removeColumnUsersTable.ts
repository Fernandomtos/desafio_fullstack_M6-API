import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnUsersTable1690393310348 implements MigrationInterface {
    name = 'RemoveColumnUsersTable1690393310348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT true`);
    }

}
