import express from "express"
import cookieParser from "cookie-parser"

import clienteRouter from "./routes/clientes.routes.js"
import emprestimoRouter from "./routes/emprestimo.routes.js"
import livroRouter from "./routes/livro.routes.js"
import funcionarioRouter from "./routes/funcionario.routes.js"
import loginRouter from "./routes/login.routes.js"




const servidor = express()

servidor.use(express.json())
servidor.use(cookieParser())
servidor.use(express.urlencoded({extended: true}))
servidor.use(express.static('views'))


servidor.set('view engine', 'ejs')


servidor.use("/client", clienteRouter)
servidor.use("/loan", emprestimoRouter)
servidor.use("/funcionario", funcionarioRouter)
servidor.use("/livro",livroRouter)
servidor.use("/login",loginRouter)

servidor.listen(3000, servico)

function servico(){

    // Faz com que o tipo data retornada pelo banco de dados
    // seja formatada no padrão DD/MM/YYYY 
    Date.prototype.toString = function() {
        return `${this.getDate().toString().padStart(2, '0')}-${(this.getMonth() + 1).toString().padStart(2, '0')}-${this.getFullYear().toString()}`;
    }

    console.log("Servidor rodando...")
}

servidor.get("/", telaInicial)

function telaInicial(req, res){
    res.sendFile("/views/login.html", { root: '.' })
}