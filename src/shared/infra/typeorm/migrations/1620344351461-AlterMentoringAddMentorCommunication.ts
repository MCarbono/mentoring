import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterMentoringAddMentorCommunication1620344351461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("mentoring", new TableColumn({
            name: "communication",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("mentoring", "communication_id")
    }

}
