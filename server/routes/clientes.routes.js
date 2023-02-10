import express from "express"
import clienteController from "../controllers/cliente.controller.js"

const router = express.Router();

router.get("/", clienteController.getAllClients)
router.get("/:cpf", clienteController.getClient)
router.post("/", clienteController.createClient)
router.delete("/:cpf", clienteController.deleteClient)
router.put("/:cpf", clienteController.updateClient)

export default router


