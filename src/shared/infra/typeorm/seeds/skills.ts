
import createConnection from '../index';
import { v4 as uuidV4} from 'uuid';

async function create(){
    const connection = await createConnection();

    let id = uuidV4();

    await connection.query(
        `INSERT INTO skills(id, name)
        VALUES('${id}', 'javascript')`
    )
    
    id = uuidV4()

    await connection.query(
        `INSERT INTO skills(id, name)
        VALUES('${id}', 'React')`
    )

    id = uuidV4()

    await connection.query(
        `INSERT INTO skills(id, name)
        VALUES('${id}', 'Banco de dados Relacional')`
    )

    id = uuidV4()

    await connection.query(
        `INSERT INTO skills(id, name)
        VALUES('${id}', 'Banco de dados Não relacional')`
    )

    connection.close();
}

create().then(() => console.log("Skills seeded"))