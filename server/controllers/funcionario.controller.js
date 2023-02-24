import funcionarioService from "../services/funcionario.service.js"

async function getAllFuncionarios(req, res){
    const rows = await funcionarioService.getAllFuncionarios();
    res.render('viewFuncionario', {rows: rows});
}

async function getFuncionario(req, res){
    const tipo = req.query.tipo;
    const cpf = req.query.cpf;
    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send("CPF Inválido.")
    }
    else{
        const rows = await funcionarioService.getFuncionario(cpf)
        if(rows == "CPF nao cadastrado"){
            res.send(rows);
        }
        else if (tipo == 'filtro'){
            res.render('viewFuncionario', {rows: rows});
        }
        else if (tipo == 'update'){
            console.log(rows[0]);
            res.render('viewUpdateFuncionario', {row: rows[0]});
        }
    }
}


async function createFuncionario(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome
    const dataNascimento = req.body.dataNascimento
    const telefone = req.body.telefone
    const endereco = req.body.endereco
    const salario = req.body.salario
    const senha = req.body.senha
    const admin = req.body.admin


    if (!cpf || !nome || !dataNascimento || !telefone || !endereco || !senha){
        res.send("CPF, nome, data de nascimento, telefone, endereço ou senha inválidos")
    }
    else if(cpf.length != 11 || !Number(cpf)){
        res.send("CPF inválido.")
    }
    else if(salario <= 0){
        res.send("O salario nao pode ser negativo.")
    }
    else{
        const rows = await funcionarioService.createFuncionario(cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin);
        if (rows[0]){
            res.redirect('/funcionario/')
        }
        else{
            res.send(rows);
        }
    }
}

async function deleteFuncionario(req, res){
    
    const cpf = req.query.cpf

    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send("CPF Inválido.")
    }
    else{
        const rows = await funcionarioService.deleteFuncionario(cpf)
        if(rows[0]){
            res.redirect('/funcionario/')
        }
        else{
            res.send(rows);
        }
    }
}

async function updateFuncionario(req, res){
    const cpfAtual = req.body.cpfAtual
    const cpf = req.body.cpf
    const nome = req.body.nome
    const telefone = req.body.telefone
    const endereco = req.body.endereco
    const salario = req.body.salario
    const senha = req.body.senha
    const admin = req.body.admin

    console.log("qualquer coisa")
    console.log(cpfAtual)

    if (!cpf || !nome || !telefone || !endereco || !senha || !cpfAtual){
        res.send("CPF, nome, telefone, endereco ou senha inválidos")
    }
    else if(cpf.length != 11){
        res.send("CPFs devem possuir 11 dígitos")
    }
    else if(salario <= 0){
        res.send("O salario nao pode ser negativo")
    }
    else if(!Number(cpf) || !Number(cpfAtual)){
        res.send("CPFs devem possuir somente números")
    }
    else{
        const rows = await funcionarioService.updateFuncionario(cpfAtual, cpf, nome, telefone, endereco, salario, senha, admin);
        console.log(rows);
        res.redirect('/funcionario/');
    }
}


export default {getAllFuncionarios, getFuncionario, createFuncionario, deleteFuncionario, updateFuncionario}