import express from "express"
import clienteController from "../controllers/cliente.controller.js"

const router = express.Router();
router.get("/", clienteController.getAllClients)
router.get("/getClient", clienteController.getClient)
router.post("/createClient", clienteController.createClient)
router.get("/delete", clienteController.deleteClient)
router.post("/update", clienteController.updateClient)

export default router


