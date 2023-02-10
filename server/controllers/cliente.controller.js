import pg from "pg"
import clienteService from "../services/cliente.service.js"

async function getAllClients(req, res){
    res.send(await clienteService.getAllClients());
}

async function getClient(req, res){
    const cpf = req.params.cpf;
    if (!cpf){
        res.send("CPF Inválido.")
    }
    else{
        res.send(await clienteService.getClient(cpf));
    }
}

async function createClient(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome
    const salario = parseFloat(req.body.salario)

    if (!cpf || !nome || !salario){
        res.send("CPF, nome ou salário inválidos")
    }
    else{
        res.send(await clienteService.createClient(cpf, nome, salario));
    }
}

async function deleteClient(req, res){
    
    const cpf = req.params.cpf

    if (!cpf){
        res.send("CPF Inválido.")
    }
    else{
        res.send(await clienteService.deleteClient(cpf));
    }
}

async function updateClient(req, res){
    
    const cpfAtual = req.params.cpf
    const cpf = req.body.cpf
    const nome = req.body.nome
    const salario = parseFloat(req.body.salario)    

    //const conn = await conectar();

    if (!cpf || !cpfAtual || !nome || !salario){
        res.send("CPF, nome ou salário inválidos")
    }
    else{
        res.send(await clienteService.updateClient(cpfAtual, cpf, nome, salario));
    }

    // try{
    //     const consulta = await conn.query("update cliente set cpf=$1, nome=$2, salario=$3 where cpf=$4 returning *", 
    //     [cpf, nome, salario, req.params.cpf])
    //     res.send("cliente alterado" + consulta.rows)
    // }
    // catch(err){
    //     console.log(err);
    // }
    // finally{
    //     conn.release();
    // }
}


export default {getAllClients, getClient, createClient, deleteClient, updateClient}