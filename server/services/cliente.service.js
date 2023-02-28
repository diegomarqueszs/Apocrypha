import clientePersistence from "../persistence/cliente.persistence.js"

/*
 * Função que obtém todos os clientes do banco de dados 
 * e retorna-os para o controller
*/
async function getAllClients(){
    return await clientePersistence.getAllClients();
}

/*
 * Função para buscar um cliente pelo cpf.
 * Ela recebe um cpf já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o cpf é passado para o persistence para obter o cliente direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller
*/
async function getClient(cpf){
    const cliente = await clientePersistence.getClient(cpf);
    if (!cliente[0]){
        console.log("CPF não cadastrado")
        return ("CPF não cadastrado")
    }else{
        return cliente
    }
}

/*
 * Função para cadastrar um cliente.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer o cadastro no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function createClient(cpf, nome, dataNascimento, telefone, endereco){
    const cliente = await clientePersistence.getClient(cpf);
    if (cliente[0]){
        console.log("CPF já cadastrado")
        return ("CPF já cadastrado")
    }else{
        return await clientePersistence.createClient(cpf, nome, dataNascimento, telefone, endereco)
    }
}


/*
 * Função para deletar um cliente pelo cpf.
 * Ela recebe um cpf já validado pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, o cpf é passado para o persistence para fazer a remoçao do cliente direto do banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function deleteClient(cpf){
    const cliente = await clientePersistence.getClient(cpf);
    if (!cliente[0]){
        console.log("CPF não cadastrado")
        return ("CPF não cadastrado")
    }
    else if(cliente[0].qntLivrosEmprestados > 0){
        console.log("Cliente pendente")
        return ("Cliente pendente")
    }
    else{
        return await clientePersistence.deleteClient(cpf) 
    }
}


/*
 * Função para alterar um cliente.
 * Ela recebe os dados já validados pelo controller e a partir daí serão aplicadas as regras de negócio,
 * se estiver tudo certo, os dados são passados para o persistence para fazer a alteraçao no banco de dados.
 * Após o retorno do persistence, ele é repassado para o controller.
*/
async function updateClient(cpfAtual, cpf, nome, telefone, endereco){
    const cliente = await clientePersistence.getClient(cpfAtual);
    const cliente2 = await clientePersistence.getClient(cpf);

    if (!cliente[0]){
        console.log("CPF não cadastrado")
        return ("CPF não cadastrado")
    }
    else{
        if (cpfAtual.localeCompare(cpf) != 0 && cliente2[0]){
            console.log("O novo CPF já está cadastrado")
            return "O novo CPF já está cadastrado"
        }
        return await clientePersistence.updateClient(cpfAtual, cpf, nome, telefone, endereco) 
    }
}

export default {getAllClients, getClient, createClient, deleteClient, updateClient}