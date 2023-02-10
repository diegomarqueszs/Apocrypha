import clientePersistence from "../persistence/cliente.persistence.js"


async function getAllClients(){
    return await clientePersistence.getAllClients();
}

async function getClient(cpf){
    const cliente = await clientePersistence.getClient(cpf);
    if (!cliente[0]){
        console.log("CPF não cadastrado")
        return ("CPF não cadastrado")
    }else{
        return cliente
    }
}

async function createClient(cpf, nome, dataNascimento, telefone, endereco){
    const cliente = await clientePersistence.getClient(cpf);
    if (cliente[0]){
        console.log("CPF já cadastrado")
        return ("CPF já cadastrado")
    }else{
        return await clientePersistence.createClient(cpf, nome, dataNascimento, telefone, endereco)
    }
}

async function deleteClient(cpf){
    const cliente = await clientePersistence.getClient(cpf);
    if (!cliente[0]){
        console.log("CPF não cadastrado")
        return ("CPF não cadastrado")
    }else{
        return await clientePersistence.deleteClient(cpf) 
    }
}

async function updateClient(cpfAtual, cpf, nome, dataNascimento, telefone, endereco){
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
        return await clientePersistence.updateClient(cpfAtual, cpf, nome, dataNascimento, telefone, endereco) 
    }
}

export default {getAllClients, getClient, createClient, deleteClient, updateClient}