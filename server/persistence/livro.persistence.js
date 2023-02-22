import {conectar} from "./bancoDeDados.js";

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

async function updateLivro(idAtual, id, nome, autor, editora, situacao){

    const conn = await conectar();

    try{
        const consulta = await conn.query(
            "update livro set id=$1, nome=$2, autor=$3, editora=$4, situacao=$5\
             where id=$6 returning *", 
            [id, nome, autor, editora, situacao,idAtual])
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