import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1620003325481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "comment",
                        type: "varchar",
                    },
                    {
                        name: "comment_star",
                        type: "varchar"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "mentor_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserComment",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKMentorComment",
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
        await queryRunner.dropTable("comments")
    }

}
