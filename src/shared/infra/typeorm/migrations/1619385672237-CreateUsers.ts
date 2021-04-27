import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1619385672237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: "id",
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: "first_name",
                        type: "varchar"
                    },
                    {
                        name: "last_name",
                        type: "varchar"
                    }, 
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    }, 
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "is_mentor",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "info_mentor",
                        type: "varchar",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "stars",
                        type: "numeric",
                        default: 0
                    },
                    {
                        name: "total_evaluations",
                        type: "numeric",
                        default: 0
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
