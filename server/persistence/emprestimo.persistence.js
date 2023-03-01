import {conectar} from "./bancoDeDados.js";

/*
 * Função que obtém todos os emprestimos do banco de dados 
 * e retorna-os para o service
*/
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

/*
 * Função para buscar um emprestimo pelo id.
 * Ela recebe um id já validado pelo controller e pelo service, então já é
 * possível procurá-lo no banco de dados sem problemas. Após o retorno
 * do banco de dados, ele é repassado para o service.
*/
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

/*
 * Função para cadastrar um emprestimo pelo id.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o insert no banco de dados. Após a insersao, o banco de dados
 * retorna o emprestimo, que também será retornado para o service.
*/
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

/*
 * Função para deletar um emprestimo pelo id.
 * Ela recebe um id já validado pelo controller e pelo service, então já é
 * possível deletá-lo do banco de dados sem problemas. Após o retorno
 * do banco de dados, ele é repassado para o service.
*/
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

/*
 * Função para alterar um emprestimo pelo id.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o update no banco de dados. Após a alteracao, o banco de dados
 * retorna o emprestimo alterado, que também será retornado para o service.
*/
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

/*
 * Função para alterar a situacao do emprestimo.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o update no banco de dados. Após a alteracao, o banco de dados
 * retorna o emprestimo alterado, que também será retornado para o service.
*/
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