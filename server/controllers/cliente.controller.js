import clienteService from "../services/cliente.service.js"

async function getAllClients(req, res){
    const rows = await clienteService.getAllClients();
    res.render('viewCliente', {rows: rows});
}

async function getClient(req, res){
    const tipo = req.query.tipo;
    const cpf = req.query.cpf;
    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send("CPF Inválido.")
    }
    else{
        const rows = await clienteService.getClient(cpf)
        if (tipo == 'filtro'){
            res.render('viewCliente', {rows: rows});
        }
        else if (tipo == 'update'){
            console.log(rows[0]);
            res.render('viewUpdateCliente', {row: rows[0]});
        }
        else{
            res.send(rows);
        }
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
        res.send("CPF inválido.")
    }
    else{
        const rows = await clienteService.createClient(cpf, nome, dataNascimento, telefone, endereco);
        if (rows[0]){
            res.redirect('/client/')
        }
        else{
            res.send(rows);
        }
    }
}

async function deleteClient(req, res){
    
    const cpf = req.query.cpf

    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send("CPF Inválido.")
    }
    else{
        const rows = await clienteService.deleteClient(cpf)
        if(rows[0]){
            res.redirect('/client/')
        }
        else{
            res.send(rows);
        }
    }
}

async function updateClient(req, res){
    
    const cpfAtual = req.body.cpfAtual
    const cpf = req.body.cpf
    const nome = req.body.nome
    const telefone = req.body.telefone
    const endereco = req.body.endereco

    console.log("qualquer coisa")
    console.log(cpfAtual)

    if (!cpf || !nome || !telefone || !endereco || !cpfAtual){
        res.send("CPF, nome ou salário inválidos")
    }
    else if(cpf.length != 11){
        res.send("CPFs devem possuir 11 dígitos")
    }
    else if(!Number(cpf) || !Number(cpfAtual)){
        res.send("CPFs devem possuir somente números")
    }
    else{
        //res.send(await clienteService.updateClient(cpfAtual, cpf, nome, telefone, endereco));
        const rows = await clienteService.updateClient(cpfAtual, cpf, nome, telefone, endereco);
        console.log(rows);
        res.redirect('/client/');
    }
}


export default {getAllClients, getClient, createClient, deleteClient, updateClient}