import {conectar} from "./bancoDeDados.js";

/*
 * Função que obtém todos os funcionarios do banco de dados 
 * e retorna-os para o service
*/
async function getAllFuncionarios(){

    const conn = await conectar();
    try{
        const consulta = await conn.query('select * from funcionario')
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
 * Função para buscar um funcionario pelo cpf.
 * Ela recebe um cpf já validado pelo controller e pelo service, então já é
 * possível procurá-lo no banco de dados sem problemas. Após o retorno
 * do banco de dados, ele é repassado para o service.
*/
async function getFuncionario(cpf){
    const conn = await conectar();

    try{
        const consulta = await conn.query("select * from funcionario where cpf=$1", [cpf])
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
 * Função para cadastrar um funcionario pelo cpf.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o insert no banco de dados. Após a insersao, o banco de dados
 * retorna o funcionario, que também será retornado para o service.
*/
async function createFuncionario(cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "INSERT INTO funcionario (cpf,nome,nascimento,telefone,endereco,salario,senha,admin)\
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
            [cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin])

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
 * Função para deletar um funcionario pelo cpf.
 * Ela recebe um cpf já validado pelo controller e pelo service, então já é
 * possível deletá-lo do banco de dados sem problemas. Após o retorno
 * do banco de dados, ele é repassado para o service.
*/
async function deleteFuncionario(cpf){

    const conn = await conectar();
    try{
        const consulta = await conn.query("delete from funcionario where cpf=$1 returning *", [cpf])
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
 * Função para alterar um funcionario pelo cpf.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o update no banco de dados. Após a alteracao, o banco de dados
 * retorna o funcionario alterado, que também será retornado para o service.
*/
async function updateFuncionario(cpfAtual, cpf, nome, telefone, endereco, salario, senha, admin){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "update funcionario set cpf=$1, nome=$2, telefone=$3, endereco=$4, salario=$5, senha=$6, admin=$7\
             where cpf=$8 returning *", 
            [cpf, nome, telefone, endereco, salario, senha, admin, cpfAtual])
        return consulta.rows
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

export default {getAllFuncionarios, getFuncionario, createFuncionario, deleteFuncionario, updateFuncionario}