import emprestimoService from "../services/emprestimo.service.js"



async function getAllLoans(req, res){
    const rows = await emprestimoService.getAllLoans();
    res.render('viewemprestimo', {rows: rows});
}

async function getLoan(req, res){
    const tipo = req.query.tipo;
    const id = req.query.id;
    if (!id || !Number(id)){
        res.send("Id Inválido.")
    }
    else{
        const rows = await emprestimoService.getLoan(id)
        if (tipo == 'filtro'){
            res.render('viewEmprestimo', {rows: rows});
        }
        else if (tipo == 'update'){
            console.log(rows[0]);
            res.render('viewUpdateEmprestimo', {row: rows[0]});
        }
        else{
            res.send(rows);
        }
    }
}


async function createLoan(req, res){
    const dataEmprestimo = req.body.dataEmprestimo
    const dataDevolucao = req.body.dataDevolucao
    const cpfCliente = req.body.cpfCliente
    const cpfFuncionario = req.body.cpfFuncionario
    const nomeLivro = req.body.nomeLivro


    if (!dataEmprestimo || !nomeLivro || !dataDevolucao || !cpfCliente || !cpfFuncionario){
        res.send("Data de emprestimo/devolucao, nome do livro, CPF do cliente ou do funcionário inválidos")
    }
    else if(cpfCliente.length != 11 || !Number(cpfCliente)){
        res.send("CPF do cliente inválido.")
    }
    else{
        const rows = await emprestimoService.createLoan(cpfCliente, dataEmprestimo, dataDevolucao, cpfFuncionario, nomeLivro);
        if (rows[0]){
            res.redirect('/Loan/')
        }
        else{
            res.send(rows);
        }
    }
}

async function deleteLoan(req, res){
    
    const id = req.query.id

    if (!id || !Number(id)){
        res.send("Id Inválido.")
    }
    else{
        const rows = await emprestimoService.deleteLoan(id)
        if(rows[0]){
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
        const dataEmprestimo = req.body.dataEmprestimo
        const dataDevolucao = req.body.dataDevolucao
        const cpfCliente = req.body.cpfCliente
        const cpfFuncionario = req.body.cpfFuncionario
        const nomeLivro = req.body.nomeLivro

        if (!dataEmprestimo || !nomeLivro || !dataDevolucao || !cpfCliente || !cpfFuncionario){
            res.send("Data de emprestimo/devolucao, nome do livro, CPF do cliente ou do funcionário inválidos")
        }
        else if(cpfCliente.length != 11 || !Number(cpfCliente)){
            res.send("CPF do cliente inválido.")
        }
        else{
            const rows = await emprestimoService.updateLoan(tipo, id, dataEmprestimo, dataDevolucao, cpfCliente, cpfFuncionario, nomeLivro);
            console.log(rows);
            res.redirect('/Loan/');
        }
    }
}


export default {getAllLoans, getLoan, createLoan, deleteLoan, updateLoan}