import createConnection from '../index';
import { v4 as uuidV4} from 'uuid';
import { hash } from 'bcrypt'
async function create(){
    const connection = await createConnection()
    const password = '1234'
    const passwordHash = await hash(password, 8)

    let uuid = uuidV4()


    await connection.query(`
        INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
        VALUES('${uuid}', 'Marcelo', 'Carbono', 'marcelo@gmail.com', '${passwordHash}', null, false, null, 0, 0, 'now()', 'now()')
    `)

    uuid = uuidV4()

    await connection.query(`
        INSERT INTO USERS(id,first_name,last_name,email,password, avatar, is_mentor, info_mentor, stars, total_evaluations, created_at, updated_at)
        VALUES('${uuid}', 'Albino', 'Vieira', 'albino@gmail.com', '${passwordHash}', null, true, 'Mentor top', 0, 0, 'now()', 'now()')
    `)

    await connection.close()
}

create().then(() => console.log("Users created"))