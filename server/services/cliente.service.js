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

        const list = document.querySelector("#funcionario-list");
        const row = document.createComment("tr");

        row.innerHTML = `
            <td>${cpf}</td>
            <td>${nome}</td>
            <td>${dataNascimento}</td>
            <td>${telefone}</td>
            <td>${endereco}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">Deletar</a>
            </td>
        `;
        list.appendChild(row);


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