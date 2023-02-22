import emprestimoPersistence from "../persistence/emprestimo.persistence.js"
import clientePersistence from "../persistence/cliente.persistence.js"
//import livroPersistence from "../persistence/livro.persistence.js"


async function getAllLoans(){
    return await emprestimoPersistence.getAllLoans();
}

async function getLoan(id){
    const emprestimo = await emprestimoPersistence.getLoan(id);
    if (!emprestimo[0]){
        console.log("Id não cadastrado")
        return ("Id não cadastrado")
    }else{
        return emprestimo
    }
}

async function createLoan(cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro){
    const cliente = await clientePersistence.getClient(cpfCliente);
    //const livro = await livroPersistence.getClient(nomeLivro);

    if(!cliente[0]){
        console.log("Cliente não cadastrado")
        return ("Cliente não cadastrado")
    }else if(!livro[0]){
        console.log("Livro não cadastrado")
        return ("Livro não cadastrado")
    }
    else{
        var livroObj = JSON.parse(livro[0])
        if (livroObj.disponivel){
            return await emprestimoPersistence.createLoan(cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro) 
        }
        else {
            console.log("Livro não disponível")
            return ("Livro não disponível")
        }
    }
}

async function deleteLoan(id){
    const emprestimo = await emprestimoPersistence.getLoan(id);
    if (!emprestimo[0]){
        console.log("id não cadastrado")
        return ("id não cadastrado")
    }else{
        return await emprestimoPersistence.deleteLoan(id) 
    }
}

async function updateLoan(tipo, id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro){
    const emprestimo = await emprestimoPersistence.getLoan(id);
    const cliente = await clientePersistence.getClient(cpfCliente);
    //const livro = await livroPersistence.getClient(nomeLivro);

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
    else{
        return await emprestimoPersistence.updateLoan(id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro)
    }
}

export default {getAllLoans, getLoan, createLoan, deleteLoan, updateLoan}