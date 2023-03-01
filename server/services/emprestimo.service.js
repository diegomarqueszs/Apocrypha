import emprestimoPersistence from "../persistence/emprestimo.persistence.js"
import clientePersistence from "../persistence/cliente.persistence.js"
import livroPersistence from "../persistence/livro.persistence.js"

/*
 * Função que obtém todos os emprestimos do banco de dados 
 * e retorna-os para o controller
*/
async function getAllLoans(){
    return await emprestimoPersistence.getAllLoans();
}

/*
 * Função para buscar um emprestimo pelo id.
 * Ela recebe um id já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o id é passado para o persistence para obter o emprestimo direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller
*/
async function getLoan(id){
    const emprestimo = await emprestimoPersistence.getLoan(id);
    if (!emprestimo[0]){
        console.log("Id não cadastrado")
        return ("Id não cadastrado")
    }else{
        return emprestimo
    }
}

/*
 * Função para cadastrar um emprestimo.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer o cadastro no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function createLoan(cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro){
    const cliente = await clientePersistence.getClient(cpfCliente);
    const livro = await livroPersistence.getLivro(nomeLivro);

    if(!cliente[0]){
        console.log("Cliente não cadastrado")
        return ("Cliente não cadastrado")
    }else if(!livro[0]){
        console.log("Livro não cadastrado")
        return ("Livro não cadastrado")
    }
    else{
        if (livro[0].disponivel){
            return await emprestimoPersistence.createLoan(cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro) 
        }
        else {
            console.log("Livro não disponível")
            return ("Livro não disponível")
        }
    }
}

/*
 * Função para deletar um emprestimo pelo id.
 * Ela recebe um id já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o id é passado para o persistence para fazer a remoçao do emprestimo direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function deleteLoan(id){
    const emprestimo = await emprestimoPersistence.getLoan(id);
    if (!emprestimo[0]){
        console.log("id não cadastrado")
        return ("id não cadastrado")
    }else if(!emprestimo[0].devolucaoRealizada){
        console.log("Emprestimo em andamento")
        return ("Emprestimo em andamento")
    }
    else{
        return await emprestimoPersistence.deleteLoan(id) 
    }
}

/*
 * Função para alterar um emprestimo.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer a alteraçao no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function updateLoan(tipo, id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro, nomeAtual){
    const emprestimo = await emprestimoPersistence.getLoan(id);
    const cliente = await clientePersistence.getClient(cpfCliente);
    const livro = await livroPersistence.getLivro(nomeLivro);

    if (!emprestimo[0]){
        console.log("Empréstimo não cadastrado")
        return ("Empréstimo não cadastrado")
    }else if(!cliente[0]){
        console.log("Cliente não cadastrado")
        return ("Cliente não cadastrado")
    }else if(!livro[0]){
        console.log("Livro não cadastrado")
        return ("Livro não cadastrado")
    }
    else if(!livro[0].disponivel && livro[0].nome.localeCompare(nomeAtual) != 0){
        console.log("Livro não disponível")
        return ("Livro não disponível") 
    }
    else{
        return await emprestimoPersistence.updateLoan(tipo, id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro)
    }
}

/*
 * Função para alterar a situacao do emprestimo.
 * Caso o funcionario clique no botão "devolução concluida", o controller chama essa função
 * e a partir daí serão aplicadas as regras de negócio. 
 * Se estiver tudo certo, os dados são passados para o persistence para fazer a alteraçao no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function updateLoanDevolucao(id){
    const emprestimo = await emprestimoPersistence.getLoan(id);

    if (!emprestimo[0]){
        console.log("Empréstimo não cadastrado")
        return ("Empréstimo não cadastrado")
    }else if(emprestimo[0].devolucaoRealizada){
        console.log("Devolução já concluída")
        return ("Devolução já concluída")
    }
    else{
        return await emprestimoPersistence.updateLoanDevolucao(id)
    }
}

export default {getAllLoans, getLoan, createLoan, deleteLoan, updateLoan, updateLoanDevolucao}