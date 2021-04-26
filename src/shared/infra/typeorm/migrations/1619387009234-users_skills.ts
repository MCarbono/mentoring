import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class usersSkills1619387009234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_skills",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "skill_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserSkill",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: "FKSkillUser",
                        referencedTableName: "skills",
                        referencedColumnNames: ["id"],
                        columnNames: ["skill_id"],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_skills")
    }

}
