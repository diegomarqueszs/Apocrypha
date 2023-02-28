import {conectar} from "./bancoDeDados.js";

/**
 * Função que obtêm  todos os livros do banco de dados
 * e retorna-os para o service
 */

async function getAllLivros(){

    const conn = await conectar();
    try{
        const consulta = await conn.query('select * from livro')
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

/**
 * Função para buscar um livro pelo nome.
 * Ela recebe um nome já validado pelo controller e pelo service, então já é
 * possível procurá-lo no bando de dados. Após o retorno do banco de 
 * dados, ele é repassado para o service.
 */

async function getLivro(nome){
    const conn = await conectar();

    try{
        const consulta = await conn.query("select * from livro where nome=$1", [nome])
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

/**
 * Função para buscar um livro pelo ID.
 * Ela recebe um id já validado pelo controller e pelo service, então já é
 * possível procurá-lo no bando de dados. Após o retorno do banco de 
 * dados, ele é repassado para o service.
 */

async function getLivroID(id){
    const conn = await conectar();

    try{
        const consulta = await conn.query("select * from livro where id=$1", [id])
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

/**
 * Função para cadastrar um livro pelo nome.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o insert no banco de dados. Após a insersao, o banco de dados
 * retorna o livro, que também será retornado para o service.
 */

async function createLivro(nome, autor, editora){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "INSERT INTO livro (nome,autor,editora)\
             VALUES ($1,$2,$3) returning *",
            [nome, autor, editora])

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
 * Função para deletar um livro pelo id.
 * Ela recebe um id já validado pelo controller e pelo service, então já é
 * possível deletá-lo do banco de dados sem problemas. Após o retorno
 * do banco de dados, ele é repassado para o service.
*/

async function deleteLivro(id){

    const conn = await conectar();
    try{
        const consulta = await conn.query("delete from livro where id=$1 returning *", [id])
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
 * Função para alterar um livro pelo id.
 * Ela recebe todos os dados já validados pelo controller e pelo service,
 * então só resta fazer o update no banco de dados. Após a alteracao, o banco de dados
 * retorna o livro alterado, que também será retornado para o service.
*/

async function updateLivro(nomeAtual, nome, autor, editora, disponivel){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "update livro set nome=$1, autor=$2, editora=$3, disponivel=$4\
             where nome=$5 returning *", 
            [nome, autor, editora, disponivel, nomeAtual])
        return consulta.rows
    }
    catch(err){
        console.log(err);
    }
    finally{
        conn.release();
    }
}

export default {getAllLivros, createLivro, getLivro, deleteLivro, getLivroID, updateLivro}