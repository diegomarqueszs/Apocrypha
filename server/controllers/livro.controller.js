import livroService from "../services/livro.service.js";

async function getAllLivros(req, res){
    const rows = await livroService.getAllLivros();
    res.render('viewLivro', {rows: rows});
}

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

async function deleteLivro(req, res){
    
    const id = parseInt(req.query.id);
    const disponivel = decodeURIComponent (req.params.disponivel)

    if (!id || !Number(id)){
        console.log("exibindo body");
        console.log(req.query);
        console.log(req.body);
        res.send('<script>alert("Id inválido!");window.history.back();</script>')
    }
    else if(!disponivel){
      res.send('<script>alert("Não é possível remover livros emprestados!");window.history.back();</script>')
    }
    else{
        const rows = await livroService.deleteLivro(id)
        if(rows[0]){
            res.redirect('/livro/')
        }
        else{
            res.send(rows);
        }
    }
}

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