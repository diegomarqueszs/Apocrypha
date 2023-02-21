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


async function deleteLivro(nome){

    const conn = await conectar();
    try{
        const consulta = await conn.query("delete from livro where nome=$1 returning *", [nome])
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

export default {getAllLivros, createLivro, getLivro, deleteLivro}