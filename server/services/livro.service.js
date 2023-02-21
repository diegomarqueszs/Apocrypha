import livroPersistence from "../persistence/livro.persistence.js"

async function getAllLivros(){
    return await livroPersistence.getAllLivros();
}

async function getLivro(nome){
    const livro = await livroPersistence.getLivro(nome);
    if (!livro[0]){
        console.log("Nome não cadastrado")
        return ("Nome não cadastrado")
    }else{
        return livro
    }
}

async function createLivro(nome, autor, editora){
    const livro = await livroPersistence.getLivro(nome);
    if (livro[0]){
        console.log("Livro já cadastrado")
        return ("Livro já cadastrado")
    }else{
        return await livroPersistence.createLivro(nome, autor, editora)
    }
}


export default {getAllLivros, createLivro, getLivro}