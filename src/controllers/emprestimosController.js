const { emprestimosModel } = require("../models/emprestimosModel");

const emprestimosController = {
    mostrarEmprestimos: async (req, res) => {
        try {
            const emprestimos = await emprestimosModel.buscarEmprestimos();

            res.status(200).json(emprestimos);
            
        } catch (error) {
            console.error("Erro ao mostrar os emprestimos: ", error);
            res.status(500).json({ erro: "Erro ao mostrar emprestimos." });
        }
    }
};

module.exports = { emprestimosController };