const express = require("express");
const router = express.Router();
const {emprestimosController} = require("../controllers/emprestimosController");

router.get("/emprestimos", emprestimosController.mostrarEmprestimos);

module.exports = { emprestimosRoutes: router };