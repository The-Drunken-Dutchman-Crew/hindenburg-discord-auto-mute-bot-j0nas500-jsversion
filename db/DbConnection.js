const mariadb = require("mariadb");

class DbConnection {
    async execute(db_connection, sql) {
        let conn;

        try {
            conn = await mariadb.createConnection({
                user: db_connection[0],
                password: db_connection[1],
                host: db_connection[2],
                port: db_connection[3],
                database: db_connection[4],
            });

            return conn.query(sql);
        } catch (err) {
            console.log(err);
        } finally {
            if (conn) conn.close();
        }
    }
}

module.exports = DbConnection;