import clienteService from "../services/cliente.service.js"

async function getAllClients(req, res){
    res.send(await clienteService.getAllClients());
}

async function getClient(req, res){
    const cpf = req.params.cpf;
    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send("CPF Inválido.")
    }
    else{
        res.send(await clienteService.getClient(cpf));
    }
}

async function createClient(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome
    const dataNascimento = req.body.dataNascimento
    const telefone = req.body.telefone
    const endereco = req.body.endereco


    if (!cpf || !nome || !dataNascimento || !telefone || !endereco){
        res.send("CPF, nome, data de nascimento, telefone ou endereço inválidos")
    }
    else if(cpf.length != 11 || !Number(cpf)){
        res.send("CPF inválido")
    }
    else{
        res.send(await clienteService.createClient(cpf, nome, dataNascimento, telefone, endereco));
    }
}

async function deleteClient(req, res){
    
    const cpf = req.params.cpf

    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send("CPF Inválido.")
    }
    else{
        res.send(await clienteService.deleteClient(cpf));
    }
}

async function updateClient(req, res){
    
    const cpfAtual = req.body.cpfAtual
    const cpf = req.body.cpf
    const nome = req.body.nome
    const dataNascimento = req.body.dataNascimento
    const telefone = req.body.telefone
    const endereco = req.body.endereco

    if (!cpf || !nome || !dataNascimento || !telefone || !endereco || !cpfAtual){
        res.send("CPF, nome ou salário inválidos")
    }
    else if(cpf.length != 11){
        res.send("CPFs devem possuir 11 dígitos")
    }
    else if(!Number(cpf) || !Number(cpfAtual)){
        res.send("CPFs devem possuir somente números")
    }
    else{
        res.send(await clienteService.updateClient(cpfAtual, cpf, nome, dataNascimento, telefone, endereco));
    }
}


export default {getAllClients, getClient, createClient, deleteClient, updateClient}