import express from "express"

import clienteRouter from "./routes/clientes.routes.js"


const servidor = express()

servidor.use(express.json())
servidor.use(express.urlencoded({extended: true}))

servidor.use("/client", clienteRouter)

servidor.listen(3000, servico)

function servico(){
    console.log("Servidor rodando...")
}