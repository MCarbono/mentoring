import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterMentoringAddMentorCommunicationId1620344351461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("mentoring", new TableColumn({
            name: "communication_id",
            type: "uuid",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("mentoring", "communication_id")
    }

}
