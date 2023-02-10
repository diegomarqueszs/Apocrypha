import pg from "pg"


async function getAllClients(){

    const conn = await conectar();
    try{
        const consulta = await conn.query('select * from cliente')
        console.log(consulta.rows)
        return consulta.rows
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

async function getClient(cpf){
    const conn = await conectar();

    try{
        const consulta = await conn.query("select * from cliente where cpf=$1", [cpf])
        console.log(consulta.rows)
        return(consulta.rows)
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

async function createClient(cpf, nome, salario){

    const conn = await conectar();

    try{
        const consulta = await conn.query("insert into cliente values($1,$2,$3) returning *", [cpf, nome, salario])
        console.log("Inserindo...... \n" + consulta.rows)
        return consulta.rows
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }


    // console.log("createClient !!!")
    // res.send("createClient !!!  " + cod + " " + nome + " " + salario)
}

async function deleteClient(cpf){

    const conn = await conectar();
    try{
        const consulta = await conn.query("delete from cliente where cpf=$1 returning *", [cpf])
        console.log("Deletando...... \n" + consulta.rows)
        return consulta.rows
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

async function updateClient(cpfAtual, cpf, nome, salario){

    const conn = await conectar();

    try{
        const consulta = await conn.query("update cliente set cpf=$1, nome=$2, salario=$3 where cpf=$4 returning *", 
        [cpf, nome, salario, cpfAtual])
        res.send("cliente alterado" + consulta.rows)
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

function conectar(){
    if (global.connection){
        return global.connection.connect();
    }
    const pool = new pg.Pool({
        connectionString:"postgres://postgres:123@localhost:5432/teste"
    })
    global.connection = pool;
    return pool.connect();
}

export default {getAllClients, getClient, createClient, deleteClient, updateClient}