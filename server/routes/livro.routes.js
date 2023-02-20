import express from "express"
import livroController from "../controllers/livro.controller.js";

const router = express.Router();
router.get("/", livroController.getAllLivros)
router.post("/createLivro", livroController.createLivro)


export default router
