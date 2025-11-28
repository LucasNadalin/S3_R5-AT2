const express = require("express");
const router = express.Router();
const {clientesController} = require("../controllers/clientesController");

router.get("/clientes", clientesController.mostrarClientes);
router.post("/clientes", clientesController.cadastrarCliente);
router.delete("/clientes/:idCliente", clientesController.deletarCliente);

module.exports = { clientesRoutes: router };