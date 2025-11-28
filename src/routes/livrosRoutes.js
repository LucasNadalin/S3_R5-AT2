const express = require("express");
const router = express.Router();
const {livrosController} = require("../controllers/livrosController");

router.get("/livros", livrosController.mostrarLivros);
router.post("/livros", livrosController.cadastrarLivros);

module.exports = { livrosRoutes: router };