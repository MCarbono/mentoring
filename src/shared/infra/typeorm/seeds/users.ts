import createConnection from '../index';
import { v4 as uuidV4} from 'uuid';
import { hash } from 'bcrypt'
async function create(){
    const connection = await createConnection()
    const password = '1234'
    const passwordHash = await hash(password, 8)

    let uuid = uuidV4()

    await connection.query(
        `INSERT INTO communications(id, name)
        values('${uuid}', 'google meeting')`
    )

    uuid = uuidV4()

    await connection.query(
        `INSERT INTO skills(id, name)
        VALUES('${uuid}', 'Banco de dados Relacional')`
    )

    uuid = uuidV4()
    
    await connection.query(`
        INSERT INTO skills(id, name)
        VALUES('${uuid}', 'Banco de dados Relacional não relacional')
    `)
    
    uuid = uuidV4()

    await connection.query(`
        INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
        VALUES('${uuid}', 'Marcelo', 'Carbono', 'marcelo@gmail.com', '${passwordHash}', null, false, null, 0, 0, 'now()', 'now()')
    `)

    uuid = uuidV4()

    await connection.query(`
        INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
        VALUES('${uuid}', 'Albino', 'Vieira', 'albino@gmail.com', '${passwordHash}', null, true, 'Mentor top', 0, 0, 'now()', 'now()')
    `)
    
    const user = await connection.query(`
        SELECT users.id from users WHERE first_name = 'Marcelo'
    `)

    const mentor = await connection.query(`
        SELECT users.id from users WHERE first_name = 'Albino'
    `)

    const skill = await connection.query(`
        SELECT * from skills
    `)

    const communication = await connection.query(`
        SELECT communications.id from communications WHERE name = 'google meeting'
    `)

    await connection.query(`
        INSERT INTO users_skills(user_id, skill_id)
        VALUES('${user[0].id}', '${skill[0].id}')
    `)

    await connection.query(`
        INSERT INTO users_skills(user_id, skill_id)
        VALUES('${mentor[0].id}', '${skill[0].id}')
    `)

    await connection.query(`
        INSERT INTO users_skills(user_id, skill_id)
        VALUES('${user[0].id}', '${skill[1].id}')
    `)

    await connection.query(`
        INSERT INTO users_skills(user_id, skill_id)
        VALUES('${mentor[0].id}', '${skill[1].id}')
    `)

    await connection.query(`
        INSERT INTO mentors_communications(mentor_id, communication_id)
        VALUES ('${mentor[0].id}', '${communication[0].id}') 
    `)   

    await connection.close();
}

create().then(() => console.log("Users created"))