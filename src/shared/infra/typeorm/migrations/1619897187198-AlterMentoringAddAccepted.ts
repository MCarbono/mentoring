import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterMentoringAddAccepted1619897187198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("mentoring", new TableColumn({
            name: "accepted",
            type: "boolean",
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("mentoring", "accepted")
    }

}
