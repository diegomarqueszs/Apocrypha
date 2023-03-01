import pg from "pg"

/* Essa função é um wrapper simples em torno da biblioteca pg que fornece uma maneira
 * de se conectar a um banco de dados PostgreSQL e reutilizar conexões de um pool de conexões.
*/
function conectar(){
    if (global.connection){
        return global.connection.connect();
    }
    const pool = new pg.Pool({
        connectionString:"postgres://postgres:123@localhost:5432/biblioteca"
    })
    global.connection = pool;
    return pool.connect();
}

export {conectar}