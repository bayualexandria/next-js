const mysql = require('mysql2/promise');


export async function query ({query, values}) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '4lex@ndr!413',
        database: 'sis',
        socketPath:'/var/run/mysqld/mysqld.sock'
    });
  try {
    const [result] = await connection.execute(query, values);
    connection.end();
    return result;
  } catch (error) {
    return error;
  }
}