import livroService from "../services/livro.service.js";

/*
 * Função que obtem os livros do banco de dados e os 
 * imprime na página do navegador
 */
async function getAllLivros(req, res){
    const rows = await livroService.getAllLivros();
    res.render('viewLivro', {rows: rows});
}

/*
 * Função para buscar um livro pelo nome
 * Ela recebe um nome, valida se o nome não é vazio
 * e passa para o service.
 * Após todo o processo, imprime o livro na página do navegador (caso o livro esteja cadastrado)
 * Ela também recebe um tipo, se for "filtro ela mostrará" apenas o livro que condiz com o enviado
 * se for do tipo update, ela enviará os dados do livro para  outra interface no qual o funcionário
 * fará a alteração dos dados.
 */

async function getLivro(req, res){
    const tipo = req.query.tipo;
    const nome = req.query.nome;
    if (!nome){
        res.send('<script>alert("Nome inválido!");window.history.back();</script>')
    }
    else{
        const rows = await livroService.getLivro(nome)
        if(rows == "Nome não cadastrado"){
            res.send('<script>alert("Nome não cadastrado!");window.history.back();</script>');
        }
        else if (tipo == 'filtro'){
            res.render('viewLivro', {rows: rows});
        }
        else if (tipo == 'update'){
            console.log(rows[0]);
            res.render('viewUpdateLivro', {row: rows[0]});
        }
    }
}

/*
 * Função para buscar um livro pelo ID
 * Ela recebe um ID  valida e passa para o service
 * Após todo o processo, imprime o livro na página do navegador (caso o livro esteja cadastrado)
 * Ela também recebe um tipo, se for "filtro ela mostrará" apenas o livro que condiz com o enviado;
 * se for do tipo update, ela enviará os dados do livro para  outra interface no qual o funcionário
 * fará a alteração dos dados.
 */

async function getLivroID(req, res){
    const tipo = req.query.tipo;
    const id = req.query.id;
    if (!id){
        res.send('<script>alert("Id inválido!");window.history.back();</script>')
    }
    else{
        const rows = await livroService.getLivroID(id)
        if(rows == "Nome não cadastrado"){
            res.send('<script>alert("Nome não cadastrado!");window.history.back();</script>');
        }
        else if (tipo == 'filtro'){
            res.render('viewLivro', {rows: rows});
        }
        else if (tipo == 'update'){
            console.log(rows[0]);
            res.render('viewUpdateLivro', {row: rows[0]});
        }
    }
}

/**
 * Função para cadastrar um livro.
 * Ela recebe os dados do navegador, faz a validação 
 * de todos os dados e passa-os para o service.
 * Após todo o processo, o livro é cadastrado no banco de dados
 * e é feita a atualização da página (caso tenha sucesso);
 * caso não tenha sucesso na criação do livro, é informado ao usuário 
 * que a operação falhou.
 */

async function createLivro(req, res){
    const nome = req.body.nome
    const autor = req.body.autor
    const editora = parseInt(req.body.editora)

    if (!nome || !nome || !autor || !editora ){
        res.send('<script>alert("Nome, autor ou edição inválidos.");window.history.back();</script>');
    }
    else if(editora<0 || !Number(editora)){
        res.send('<script>alert("Edicao inválida!");window.history.back();</script>');
    }
    else{
        const rows = await livroService.createLivro(nome, autor, editora);
        if(rows == "Livro já cadastrado"){
            res.send('<script>alert("Livro já cadastrado!");window.history.back();</script>');
        }
        else if(rows[0]){
            res.redirect('/livro/')
        }
    }
}

/**
 * Função para deletar um livro pelo ID.
 * Ela recebe um id pelo  navegador, faz a validação e 
 * passa para o service. 
 * Após todo o processo, o livro é removido no banco de dados e é
 * feita a atualização da página (caso tenha sucesso);
 * caso não tenha sucesso em deletar do livro, é informado ao usuário 
 * que a operação falhou.
 */

async function deleteLivro(req, res){
    const id = parseInt(req.query.id);

    if (!id || !Number(id)){
        console.log("exibindo body");
        console.log(req.query);
        console.log(req.body);
        res.send('<script>alert("Id inválido!");window.history.back();</script>')
    }
    else{
        const rows = await livroService.deleteLivro(id)
        if(rows == "Livro não disponivel"){
            res.send('<script>alert("Não é possível remover livros emprestados!");window.history.back();</script>')
        }
        else if(rows[0]){
            res.redirect('/livro/')
        }
        else{
            res.send(rows);
        }
    }
}

/**
 * Função para alterar um livro.
 * Ela recebe todos os dados do navegador, faz a validação
 * de todos eles e passa-os para o service.
 * Após todo o processo, o livro é alterado no banco de dados
 * e é feita atualização da página (caso tenha sucesso);
 * caso não tenha sucesso em alterar o livro, é informado ao usuário 
 * que a operação falhou.
 */

async function updateLivro(req, res){
    const nomeAtual = req.body.nomeAtual
    const nome = req.body.nome
    const autor = req.body.autor
    const editora = parseInt(req.body.editora)
    const disponivel = req.body.disponivel

    console.log("qualquer coisa")
    console.log(nomeAtual)
    console.log(nome)

    if (!nome || !autor || !editora || !nomeAtual || !disponivel){
        res.send('<script>alert("Nome, autor, editora ou situação inválidos.");window.history.back();</script>')
    }
    else{
        const rows = await livroService.updateLivro(nomeAtual, nome, autor, editora,disponivel);
        if(rows == "O novo nome já está cadastrado"){
            res.send('<script>alert("Nome já cadastrado!");window.history.back();</script>');
        }
        else if(rows[0]){
            console.log(rows);
            res.redirect('/livro/');
        }
    }
}


export default {getAllLivros, createLivro, getLivro, deleteLivro, updateLivro, getLivroID}