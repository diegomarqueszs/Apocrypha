import livroPersistence from "../persistence/livro.persistence.js";
import livroService from "../services/livro.service.js";
import clienteService from "../services/livro.service.js"

async function getAllLivros(req, res){
    const rows = await clienteService.getAllLivros();
    res.render('viewLivro', {rows: rows});
}

async function getLivro(req, res){
    const tipo = req.query.tipo;
    const nome = req.query.nome;
    if (!nome){
        res.send("Nome Inválido.")
    }
    else{
        const rows = await livroService.getLivro(nome)
        if (tipo == 'filtro'){
            res.render('viewLivro', {rows: rows});
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


async function createLivro(req, res){
    const nome = req.body.nome
    const autor = req.body.autor
    const editora = req.body.editora

    if (!nome || !nome || !autor || !editora ){
        res.send("Nome, autor ou edição inválidos")
    }
    else if(editora<0 || !Number(editora)){
        res.send("Edicao inválida.")
    }
    else{
        const rows = await livroService.createLivro(nome, autor, editora);
        if (rows[0]){
            res.redirect('/livro/')
        }
        else{
            res.send(rows);
        }
    }
}

async function deleteLivro(req, res){
    
    const nome = decodeURIComponent(req.params.nome)

    if (!nome){
        res.send("Nome Inválido.")
    }
    else{
        const rows = await livroPersistence.deleteLivro(nome)
        if(rows[0]){
            res.redirect('/livro/')
        }
        else{
            res.send(rows);
        }
    }
}

export default {getAllLivros, createLivro, getLivro, deleteLivro}