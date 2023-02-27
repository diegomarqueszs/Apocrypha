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

async function getLivroID(id){
    const livro = await livroPersistence.getLivroID(id);
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
    }
    else if(!livro[0].disponivel){
        console.log("Livro não disponivel")
        return ("Livro não disponivel")
    }
    else{
        return await livroPersistence.deleteLivro(id) 
    }
}

async function updateLivro(nomeAtual, nome, autor, editora,disponivel){
    const livro = await livroPersistence.getLivro(nomeAtual);
    const livro2 = await livroPersistence.getLivro(nome);
    
    if (!livro[0]){
        console.log("Livro não cadastrado")
        return ("Livro não cadastrado")
    }
    else{
        if (nomeAtual.localeCompare(nome) != 0 && livro2[0]){
            console.log("O novo nome já está cadastrado")
            return "O novo nome já está cadastrado"
        }
        return await livroPersistence.updateLivro(nomeAtual, nome, autor, editora,disponivel) 
    }
}

export default {getAllLivros, createLivro, getLivro, deleteLivro, updateLivro,getLivroID}