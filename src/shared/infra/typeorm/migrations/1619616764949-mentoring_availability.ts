import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class mentoringAvailability1619616764949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "mentoring_availabilities",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "start_date",
                        type: "timestamp"
                    },
                    {
                        name: "end_date",
                        type: "timestamp"
                    },
                    {
                        name: "mentor_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKMentorMentoringAvailabilities",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["mentor_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE" 
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("mentoring_availabilities");
    }

}
