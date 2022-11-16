const mariadb = require("mariadb");

async function DbConnection(user, password, host, port, database) {
    let conn;

    try {
        conn = await mariadb.createConnection({
            user: user,
            password: password,
            host: host,
            port: port,
            database: database,
        });
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.close();
    }
}

async function execute_list() {
    
}