import express from "express"

import clienteRouter from "./routes/clientes.routes.js"


const servidor = express()

servidor.use(express.json())
servidor.use(express.urlencoded({extended: true}))
servidor.use(express.static('./view/style.css'));

servidor.get("/login", telaInicial)


servidor.use("/client", clienteRouter)

servidor.listen(3000, servico)

function servico(){
    console.log("Servidor rodando...")
}

function telaInicial(req, res){
    res.sendFile("index.html", { root: '.' })
}