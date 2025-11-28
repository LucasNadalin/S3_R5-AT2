const { clientesModel } = require("../models/clientesModel");

const clientesController = {
    mostrarClientes: async (req, res) => {
        try {
            const clientes = await clientesModel.buscarClientes();

            res.status(200).json(clientes);

        } catch (error) {
            console.error("Erro ao mostrar os clientes: ", error);
            res.status(500).json({ erro: "Erro interno do servidor ao mostrar clientes." });
        }
    },

    cadastrarCliente: async (req, res) => {
        try {
            const { nomeCliente, email, senha } = req.body;

            const verificacaoEmail = await clientesModel.buscarEmail(email);

            if (nomeCliente == undefined || nomeCliente.trim() == "" || email == undefined || email.trim() == "" || senha == undefined || senha.trim() == "") {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
            }

            if (verificacaoEmail.length > 0) {
                return res.status(400).json({ erro: "Esse email já foi cadastrado" });
            }

            await clientesModel.adicionarClientes(nomeCliente, email, senha);

            res.status(200).json({ message: "Cliente cadastrado com sucesso!" })

        } catch (error) {
            console.error("Erro ao cadastrar clientes: ", error);
            res.status(500).json({ erro: "Erro interno do servidor ao cadastrar clientes." });
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            if (idCliente.length != 36) {
                return res.status(400).json({ erro: "Id do cliente inválido!" });
            };

            const cliente = await clientesModel.buscarID(idCliente);

            if (!cliente || cliente.length !== 1) {
                return res.status(404).json({ erro: "Cliente não encontrado!" })
            };

            await clientesModel.removerClientes(idCliente);

            res.status(200).json({ message: "Sucesso ao deletar cliente!" });

        } catch (error) {
            console.error("Erro ao deletar cliente: ", error);
            res.status(500).json({ erro: "Erro interno no servidor ao deletar cliente!" });
        }
    }
};

module.exports = { clientesController };