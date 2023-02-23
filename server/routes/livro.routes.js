import express from "express"
import livroController from "../controllers/livro.controller.js";

const router = express.Router();
router.get("/", livroController.getAllLivros)
router.post("/createLivro", livroController.createLivro)
router.get("/getLivro", livroController.getLivro)
router.get("/getLivroID", livroController.getLivroID)
router.get("/delete", livroController.deleteLivro)
router.post("/update", livroController.updateLivro)


export default router
