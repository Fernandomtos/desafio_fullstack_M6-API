import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTable1690389495948 implements MigrationInterface {
    name = 'UpdateUsersTable1690389495948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
