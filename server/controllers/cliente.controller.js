import clienteService from "../services/cliente.service.js"


/*
 * Função que obtém todos os clientes do banco de dados.
 * e imprime-os na página do navegador
*/
async function getAllClients(req, res){
    const rows = await clienteService.getAllClients();
    res.render('viewCliente', {rows: rows});
}


/*
 * Função para buscar um cliente pelo cpf.
 * Ela recebe um cpf, faz a validaçao
 * e passa-o para o service. 
 * Após todo o processo, imprime o cliente na página do navegador (caso tenha sucesso)
 * Ela também recebe um tipo, se for "filtro", ela mostrará apenas o cliente filtrado
 * na interface atual do navegador. Se for do tipo "update", ela enviará os dados para
 * outra interface no qual o funcionário fará a alteraçao dos dados.
*/
async function getClient(req, res){
    const tipo = req.query.tipo;
    const cpf = req.query.cpf;
    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send('<script>alert("CPF inválido!");window.history.back();</script>');
    }
    else{
        const rows = await clienteService.getClient(cpf)
        if(rows == "CPF não cadastrado"){
            res.send('<script>alert("CPF não cadastrado!");window.history.back();</script>');
        }
        else if (tipo == 'filtro'){
            res.render('viewCliente', {rows: rows});
        }
        else if (tipo == 'update'){
            console.log(rows[0]);
            res.render('viewUpdateCliente', {row: rows[0]});
        }
    }
}

/*
 * Função para cadastrar um cliente.
 * Ela recebe os dados do navegador, faz a validaçao
 * de todos eles e passa-os para o service. 
 * Após todo o processo, o cliente é cadastrado no banco de dados
 * e é feita a atualização da página (caso tenha sucesso)
 * ou é lançado um popup do erro (caso nao tenha sucesso)
*/
async function createClient(req, res){
    const cpf = req.body.cpf
    const nome = req.body.nome
    const dataNascimento = req.body.dataNascimento
    const telefone = req.body.telefone
    const endereco = req.body.endereco


    if (!cpf || !nome || !dataNascimento || !telefone || !endereco){
        res.send('<script>alert("CPF, nome, data de nascimento, telefone ou endereço inválidos");window.history.back();</script>');
    }
    else if(cpf.length != 11 || !Number(cpf)){
        res.send('<script>alert("CPF inválido!");window.history.back();</script>');
    }
    else{
        const rows = await clienteService.createClient(cpf, nome, dataNascimento, telefone, endereco);
        if(rows == "CPF já cadastrado"){
            res.send('<script>alert("CPF já cadastrado!");window.history.back();</script>');
        }
        else if (rows[0]){
            res.redirect('/client/')
        }
    }
}

/*
 * Função para deletar um cliente pelo cpf.
 * Ela recebe um cpf do navegador, faz a validaçao
 * e passa-o para o service. 
 * Após todo o processo, o cliente é removido no banco de dados
 * e é feita a atualização da página (caso tenha sucesso)
 * ou é lançado um popup do erro (caso nao tenha sucesso)
*/
async function deleteClient(req, res){
    const cpf = req.query.cpf

    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send('<script>alert("CPF inválido");window.history.back();</script>');
    }
    else{
        const rows = await clienteService.deleteClient(cpf)
        if(rows == "Cliente pendente"){
            res.send('<script>alert("Não é possível remover clientes com pendências!");window.history.back();</script>')
        }
        else if(rows[0]){
            res.redirect('/client/')
        }
        else{
            res.send(rows);
        }
    }
}

/*
 * Função para alterar um cliente.
 * Ela recebe os dados do navegador, faz a validaçao
 * de todos eles e passa-os para o service. 
 * Após todo o processo, o cliente é alterado no banco de dados
 * e é feita a atualização da página (caso tenha sucesso)
 * ou é lançado um popup do erro (caso nao tenha sucesso)
*/
async function updateClient(req, res){
    
    const cpfAtual = req.body.cpfAtual
    const cpf = req.body.cpf
    const nome = req.body.nome
    const telefone = req.body.telefone
    const endereco = req.body.endereco

    console.log("qualquer coisa")
    console.log(cpfAtual)

    if (!cpf || !nome || !telefone || !endereco || !cpfAtual){
        res.send('<script>alert("CPF, nome, telefone ou endereço inválidos");window.history.back();</script>');
    }
    else if(cpf.length != 11){
        res.send('<script>alert("CPFs devem possuir 11 dígitos");window.history.back();</script>');
    }
    else if(!Number(cpf) || !Number(cpfAtual)){
        res.send('<script>alert("CPFs devem possuir somente números");window.history.back();</script>');
    }
    else{
        const rows = await clienteService.updateClient(cpfAtual, cpf, nome, telefone, endereco);
        if(rows == "O novo CPF já está cadastrado"){
            res.send('<script>alert("CPF já cadastrado!");window.history.back();</script>');
        }
        else if(rows[0]){
            console.log(rows);
            res.redirect('/client/');
        }
    }
}


export default {getAllClients, getClient, createClient, deleteClient, updateClient}