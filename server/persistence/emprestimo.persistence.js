import {conectar} from "./bancoDeDados.js";

async function getAllLoans(){

    const conn = await conectar();
    
    try{
        const consulta = await conn.query('select * from emprestimo')
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

async function getLoan(id){
    const conn = await conectar();

    try{
        const consulta = await conn.query("select * from emprestimo where id=$1", [id])
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

async function createLoan(cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "INSERT INTO emprestimo (cpfcliente,nomelivro,cpffuncionario,dataemprestimo,datadevolucao) \
            VALUES ($1,$5,$4,$2,$3) returning *",
            [cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro])

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

async function deleteLoan(id){

    const conn = await conectar();
    try{
        const consulta = await conn.query("delete from emprestimo where id=$1 returning *", [id])
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

async function updateLoan(tipo, id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro){

    const conn = await conectar();

    try{
        var consulta;
        if (tipo == 'update'){
            consulta = await conn.query(
                "update emprestimo set dataemprestimo=$2, datadevolucao=$3, cpfcliente=$4, cpffuncionario=$5, nomelivro=$6\
                 where id=$1 returning *",
                [id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro]);
        }else{
            consulta = await conn.query(
                'update emprestimo set "devolucaoRealizada"=true,\
                 where id=$1 returning *', 
                [id]);
        }
        return consulta.rows;
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

async function updateLoanDevolucao(id){

    const conn = await conectar();

    try{
        const consulta = await conn.query('update emprestimo set "devolucaoRealizada"=true\
                                           where id=$1 returning *', [id]);
        return consulta.rows;
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

export default {getAllLoans, getLoan, createLoan, deleteLoan, updateLoan, updateLoanDevolucao}