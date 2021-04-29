import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class mentoring1619718837602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "mentoring",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "subject",
                        type: "varchar"
                    },
                    {
                        name: "isDone",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "refused",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "refused_info",
                        type: "varchar",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "mentor_id",
                        type: "uuid"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "mentor_availability_id",
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
                        name: "FKMentorMentoring",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["mentor_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKUserMentoring",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKMentorsAvailabilities",
                        referencedTableName: "mentors_availabilities",
                        referencedColumnNames: ["id"],
                        columnNames: ["mentor_availability_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("mentoring")
    }
}
