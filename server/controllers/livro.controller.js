import livroService from "../services/livro.service.js";
import clienteService from "../services/livro.service.js"

async function getAllLivros(req, res){
    const rows = await clienteService.getAllLivros();
    res.render('viewLivro', {rows: rows});
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

export default {getAllLivros, createLivro}