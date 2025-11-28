const express = require("express");
const router = express.Router();
const {livrosController} = require("../controllers/livrosController");

router.get("/livros", livrosController.mostrarLivros);
router.post("/livros", livrosController.cadastrarLivros);
router.delete("/livros/:idLivro", livrosController.deletarLivros);

module.exports = { livrosRoutes: router };