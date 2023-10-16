import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAdminColumn1696874619114 implements MigrationInterface {
    name = 'AlterAdminColumn1696874619114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
        await queryRunner.query(`CREATE TYPE "public"."users_admin_enum" AS ENUM('userCommon', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" "public"."users_admin_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
        await queryRunner.query(`DROP TYPE "public"."users_admin_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

}
