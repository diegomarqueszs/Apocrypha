import express from "express"
import funcionarioController from "../controllers/funcionario.controller.js"

const router = express.Router();
router.get("/", funcionarioController.getAllFuncionarios)
router.get("/getFuncionario", funcionarioController.getFuncionario)
router.post("/createFuncionario", funcionarioController.createFuncionario)
router.get("/delete", funcionarioController.deleteFuncionario)
router.post("/update", funcionarioController.updateFuncionario)

export default router