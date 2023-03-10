import funcionarioService from "../services/funcionario.service.js"

/*
 * Função que obtém todos os funcionarios do banco de dados.
 * e imprime-os na página do navegador
*/
async function getAllFuncionarios(req, res){
    if(req.cookies.ehAdm == 'false'){
        res.send('<script>alert("Você não tem permissão para entrar!");window.history.back();</script>');
    }
    else{
        const rows = await funcionarioService.getAllFuncionarios();
        res.render('viewFuncionario', {rows: rows});
    }
}

/*
 * Função para buscar um funcionario pelo cpf.
 * Ela recebe um cpf, faz a validaçao
 * e passa-o para o service. 
 * Após todo o processo, imprime o funcionario na página do navegador (caso tenha sucesso)
 * Ela também recebe um tipo, se for "filtro", ela mostrará apenas o funcionario filtrado
 * na interface atual do navegador. Se for do tipo "update", ela enviará os dados para
 * outra interface no qual o funcionário fará a alteraçao dos dados.
*/
async function getFuncionario(req, res){
    const tipo = req.query.tipo;
    const cpf = req.query.cpf;
    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send('<script>alert("CPF Inválido!");window.history.back();</script>');
    }
    else{
        const rows = await funcionarioService.getFuncionario(cpf)
        if(rows == "CPF nao cadastrado"){
            res.send('<script>alert("CPF não cadastrado!");window.history.back();</script>');
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

/*
 * Função para cadastrar um funcionario.
 * Ela recebe os dados do navegador, faz a validaçao
 * de todos eles e passa-os para o service. 
 * Após todo o processo, o funcionario é cadastrado no banco de dados
 * e é feita a atualização da página (caso tenha sucesso)
 * ou é lançado um popup do erro (caso nao tenha sucesso)
*/
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
        res.send('<script>alert("CPF, nome, data de nascimento, telefone, endereço ou senha inválidos!");window.history.back();</script>');
    }
    else if(cpf.length != 11 || !Number(cpf)){
        res.send('<script>alert("CPF Inválido!");window.history.back();</script>');
    }
    else if(salario < 0){
        res.send('<script>alert("O salário não pode ser negativo!");window.history.back();</script>');
    }
    else{
        const rows = await funcionarioService.createFuncionario(cpf, nome, dataNascimento, telefone, endereco, salario, senha, admin);
        if(rows == "CPF ja cadastrado"){
            res.send('<script>alert("CPF já cadastrado!");window.history.back();</script>');
        }
        else if(rows[0]){
            res.redirect('/funcionario/')
        }
    }
}

/*
 * Função para deletar um funcionario pelo cpf.
 * Ela recebe um cpf do navegador, faz a validaçao
 * e passa-o para o service. 
 * Após todo o processo, o funcionario é removido no banco de dados
 * e é feita a atualização da página (caso tenha sucesso)
 * ou é lançado um popup do erro (caso nao tenha sucesso)
*/
async function deleteFuncionario(req, res){
    
    const cpf = req.query.cpf

    if (!cpf || cpf.length != 11 || !Number(cpf)){
        res.send('<script>alert("CPF Inválido!");window.history.back();</script>');
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

/*
 * Função para alterar um funcionario.
 * Ela recebe os dados do navegador, faz a validaçao
 * de todos eles e passa-os para o service. 
 * Após todo o processo, o funcionario é alterado no banco de dados
 * e é feita a atualização da página (caso tenha sucesso)
 * ou é lançado um popup do erro (caso nao tenha sucesso)
*/
async function updateFuncionario(req, res){
    const cpfAtual = req.body.cpfAtual
    const cpf = req.body.cpf
    const nome = req.body.nome
    const telefone = req.body.telefone
    const endereco = req.body.endereco
    const salario = req.body.salario
    const senha = req.body.senha
    const admin = req.body.admin

    if (!cpf || !nome || !telefone || !endereco || !senha || !cpfAtual){
        res.send('<script>alert("CPF, nome, telefone, endereco ou senha inválidos");window.history.back();</script>');
    }
    else if(cpf.length != 11){
        res.send('<script>alert("CPFs devem possuir 11 dígitos");window.history.back();</script>');
    }
    else if(salario < 0){
        res.send('<script>alert("O salário não pode ser negativo!");window.history.back();</script>');
    }
    else if(!Number(cpf) || !Number(cpfAtual)){
        res.send('<script>alert("CPFs devem possuir somente números");window.history.back();</script>');
    }
    else{
        const rows = await funcionarioService.updateFuncionario(cpfAtual, cpf, nome, telefone, endereco, salario, senha, admin);
        if(rows == "O novo CPF ja esta cadastrado"){
            res.send('<script>alert("CPF já cadastrado!");window.history.back();</script>');
        }
        else if(rows[0]){
            console.log(rows);
            res.redirect('/funcionario/');
        }
    }
}


export default {getAllFuncionarios, getFuncionario, createFuncionario, deleteFuncionario, updateFuncionario}