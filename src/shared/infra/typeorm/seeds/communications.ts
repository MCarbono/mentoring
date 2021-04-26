
import createConnection from '../index';
import {v4 as uuidV4 } from 'uuid';

async function create() {
    const connection = await createConnection();

    let id = uuidV4();

    await connection.query(
        `INSERT INTO communications(id, name)
        values('${id}', 'skype')`
    )

    id = uuidV4();

    await connection.query(
        `INSERT INTO communications(id, name)
        values('${id}', 'zoom')`
    )

    id = uuidV4();

    await connection.query(
        `INSERT INTO communications(id, name)
        values('${id}', 'google meeting')`
    )

    await connection.close();
}

create().then(() => console.log("Communications created"))

