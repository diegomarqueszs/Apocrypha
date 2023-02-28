import {conectar} from "./bancoDeDados.js";


/*
 * Função que obtém todos os clientes do banco de dados 
 * e retorna-os para o service
*/
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


/*
 * Função para buscar um cliente pelo cpf.
 * Ela recebe um cpf já validado pelo controller e pelo service, então já é
 * possível procurá-lo no banco de dados sem problemas. Após o retorno
 * do banco de dados, ele é repassado para o service.
*/
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


/*
 * Função para cadastrar um cliente pelo cpf.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o insert no banco de dados. Após a insersao, o banco de dados
 * retorna o cliente, que também será retornado para o service.
*/
async function createClient(cpf, nome, dataNascimento, telefone, endereco){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "INSERT INTO cliente (cpf,nome,nascimento,telefone,endereco)\
             VALUES ($1,$2,$3,$4,$5) returning *",
            [cpf, nome, dataNascimento, telefone, endereco])

        console.log("Inserindo...... \n" + consulta.rows)
        return consulta.rows
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}


/*
 * Função para deletar um cliente pelo cpf.
 * Ela recebe um cpf já validado pelo controller e pelo service, então já é
 * possível deletá-lo do banco de dados sem problemas. Após o retorno
 * do banco de dados, ele é repassado para o service.
*/
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


/*
 * Função para cadastrar um cliente pelo cpf.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o update no banco de dados. Após a alteracao, o banco de dados
 * retorna o cliente alterado, que também será retornado para o service.
*/
async function updateClient(cpfAtual, cpf, nome, telefone, endereco){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "update cliente set cpf=$1, nome=$2, telefone=$3, endereco=$4\
             where cpf=$5 returning *", 
            [cpf, nome, telefone, endereco, cpfAtual])
        return consulta.rows
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

export default {getAllClients, getClient, createClient, deleteClient, updateClient}