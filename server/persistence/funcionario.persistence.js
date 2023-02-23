import {conectar} from "./bancoDeDados.js";

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