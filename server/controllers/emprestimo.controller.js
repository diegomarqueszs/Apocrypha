import emprestimoService from "../services/emprestimo.service.js"



async function getAllLoans(req, res){
    const rows = await emprestimoService.getAllLoans();
    res.render('viewemprestimo', {rows: rows});
}

async function getLoan(req, res){
    const tipo = req.query.tipo;
    const id = req.query.id;
    if (!id || !Number(id)){
        res.send('<script>alert("Id inválido!");window.history.back();</script>');
    }
    else{
        const rows = await emprestimoService.getLoan(id)
        if(rows == "Id não cadastrado"){
            res.send('<script>alert("Id não cadastrado!");window.history.back();</script>');
        }
        else if (tipo == 'filtro'){
            res.render('viewEmprestimo', {rows: rows});
        }
        else if (tipo == 'update'){
            console.log(rows[0]);
            res.render('viewUpdateEmprestimo', {row: rows[0]});
        }
    }
}


async function createLoan(req, res){
    const dataEmprestimo = req.body.dataEmprestimo
    const dataDevolucao = req.body.dataDevolucao
    const cpfCliente = req.body.cpfCliente
    const cpfFuncionario = req.cookies.cpfFunc
    const nomeLivro = req.body.nomeLivro


    if (!dataEmprestimo || !nomeLivro || !dataDevolucao || !cpfCliente || !cpfFuncionario){
        res.send('<script>alert("Data de emprestimo/devolucao, nome do livro, CPF do cliente ou do funcionário inválidos");window.history.back();</script>');
    }
    else if(cpfCliente.length != 11 || !Number(cpfCliente)){
        res.send('<script>alert("CPF do cliente inválido!");window.history.back();</script>');
    }
    else{
        const rows = await emprestimoService.createLoan(cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro);
        if(rows == "Cliente não cadastrado"){
            res.send('<script>alert("Cliente não cadastrado!");window.history.back();</script>');
        }
        else if(rows == "Livro não cadastrado"){
            res.send('<script>alert("Livro não cadastrado!");window.history.back();</script>');
        }
        else if(rows == "Livro não disponível"){
            res.send('<script>alert("Livro esta em um empréstimo ativo!");window.history.back();</script>');
        }
        else if(rows[0]){
            res.redirect('/Loan/')
        }
    }
}

async function deleteLoan(req, res){
    
    const id = req.query.id

    if (!id || !Number(id)){
        res.send('<script>alert("Id inválido");window.history.back();</script>');
    }
    else{
        const rows = await emprestimoService.deleteLoan(id)
        if(rows == "Emprestimo em andamento"){
            res.send('<script>alert("Não é possível excluir um empréstimo ativo!");window.history.back();</script>');
        }
        else if(rows[0]){
            res.redirect('/Loan/')
        }
        else{
            res.send(rows);
        }
    }
}

async function updateLoan(req, res){

    const tipo = req.body.tipo
    const id = req.body.id
    if (tipo == "attDevolucao"){
        const rows = await emprestimoService.updateLoanDevolucao(id);
        console.log(rows);
        res.redirect('/Loan/');
    }
    else{
        const nomeAtual = req.body.nomeAtual
        const dataEmprestimo = req.body.dataEmprestimo
        const dataDevolucao = req.body.dataDevolucao
        const cpfCliente = req.body.cpfCliente
        const cpfFuncionario = req.cookies.cpfFunc
        const nomeLivro = req.body.nomeLivro

        if (!dataEmprestimo || !nomeLivro || !dataDevolucao || !cpfCliente || !cpfFuncionario || !nomeAtual){
            res.send('<script>alert("Data de emprestimo/devolucao, nome do livro, CPF do cliente ou do funcionário inválidos");window.history.back();</script>');
        }
        else if(cpfCliente.length != 11 || !Number(cpfCliente)){
            res.send('<script>alert("CPF do cliente inválido!");window.history.back();</script>');
        }
        else{
            const rows = await emprestimoService.updateLoan(tipo, id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro, nomeAtual);
            if(rows == "Empréstimo não cadastrado"){
                res.send('<script>alert("Empréstimo não cadastrado");window.history.back();</script>');
            }
            else if(rows == "Cliente não cadastrado"){
                res.send('<script>alert("Cliente não cadastrado!");window.history.back();</script>');
            }
            else if(rows == "Livro não cadastrado"){
                res.send('<script>alert("Livro não cadastrado!");window.history.back();</script>');
            }
            else if(rows == "Livro não disponível"){
                res.send('<script>alert("Livro esta em um empréstimo ativo!");window.history.back();</script>');
            }
            else if(rows[0]){
                console.log(rows);
                res.redirect('/Loan/');
            }
        }
    }
}


export default {getAllLoans, getLoan, createLoan, deleteLoan, updateLoan}