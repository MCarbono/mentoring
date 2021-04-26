import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class mentorsCommunications1619387472621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "mentors_communications",
                columns: [
                    {
                        name: "mentor_id",
                        type: "uuid"
                    },
                    {
                        name: "communication_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKMentorCommunication",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["mentor_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKCommunicationMentor",
                        referencedTableName: "communications",
                        referencedColumnNames: ["id"],
                        columnNames: ["communication_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("mentors_communications")
    }

}
