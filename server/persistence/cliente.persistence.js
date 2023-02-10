import {conectar} from "./bancoDeDados.js";

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

async function updateClient(cpfAtual, cpf, nome, dataNascimento, telefone, endereco){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "update cliente set cpf=$1, nome=$2, nascimento=$3, telefone=$4, endereco=$5\
             where cpf=$6 returning *", 
            [cpf, nome, dataNascimento, telefone, endereco, cpfAtual])
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