import livroPersistence from "../persistence/livro.persistence.js"

/*
 * Função que obtém todos os livros do banco de dados 
 * e retorna-os para o controller
*/
async function getAllLivros(){
    return await livroPersistence.getAllLivros();
}

/*
 * Função para buscar um livro pelo nome.
 * Ela recebe um nome já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o nome é passado para o persistence para obter o livro direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller
*/

async function getLivro(nome){
    const livro = await livroPersistence.getLivro(nome);
    if (!livro[0]){
        console.log("Nome não cadastrado")
        return ("Nome não cadastrado")
    }else{
        return livro
    }
}

/*
 * Função para buscar um livro pelo id.
 * Ela recebe um id já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o id é passado para o persistence para obter o livro direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller
*/

async function getLivroID(id){
    const livro = await livroPersistence.getLivroID(id);
    if (!livro[0]){
        console.log("Nome não cadastrado")
        return ("Nome não cadastrado")
    }else{
        return livro
    }
}

/*
 * Função para cadastrar um livro.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer o cadastro no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/

async function createLivro(nome, autor, editora){
    const livro = await livroPersistence.getLivro(nome);
    if (livro[0]){
        console.log("Livro já cadastrado")
        return ("Livro já cadastrado")
    }else{
        return await livroPersistence.createLivro(nome, autor, editora)
    }
}

/*
 * Função para deletar um livro pelo od.
 * Ela recebe um id já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o id é passado para o persistence para fazer a remoçao do livro direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
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

/*
 * Função para alterar um livro.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer a alteraçao no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
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