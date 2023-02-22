import express from "express"
import emprestimoController from "../controllers/emprestimo.controller.js"

const router = express.Router();

router.get("/", emprestimoController.getAllLoans)
router.get("/getLoan", emprestimoController.getLoan)
router.post("/createLoan", emprestimoController.createLoan)
router.get("/delete", emprestimoController.deleteLoan)
router.post("/update", emprestimoController.updateLoan)

export default router


