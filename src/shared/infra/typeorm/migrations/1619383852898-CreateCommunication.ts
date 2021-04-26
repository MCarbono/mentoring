import {MigrationInterface, QueryRunner, Table, Unique} from "typeorm";

export class CreateCommunication1619383852898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "communications",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    }, 
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("communications")
    }

}
