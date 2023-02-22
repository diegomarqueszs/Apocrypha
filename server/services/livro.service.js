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

async function deleteLivro(id){
    const livro = await livroPersistence.getLivroID(id);
    if (!livro[0]){
        console.log("Livro não cadastrado")
        return ("Livro não cadastrado")
    }else{
        return await livroPersistence.deleteLivro(id) 
    }
}

async function updateLivro(idAtual, id, nome, autor, editora,situacao){
    //console.log("passou1")
    const livro = await livroPersistence.getLivroID(idAtual);
    //console.log("passou2")
    const livro2 = await livroPersistence.getLivroID(id);
    //console.log("passou3")

    if (!livro[0]){
        console.log("Livro não cadastrado")
        return ("Livro não cadastrado")
    }
    else{
        if (idAtual.localeCompare(id) != 0 && livro2[0]){
            console.log("O novo id já está cadastrado")
            return "O novo id já está cadastrado"
        }
        return await livroPersistence.updateLivro(idAtual, id, nome, autor, editora,situacao) 
    }
}


export default {getAllLivros, createLivro, getLivro, deleteLivro, updateLivro}