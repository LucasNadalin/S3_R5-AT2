const { livrosModel } = require("../models/livrosModel");

const livrosController = {
    mostrarLivros: async (req, res) => {
        try {
            const livros = await livrosModel.buscarLivros();

            res.status(200).json(livros);

        } catch (error) {
            console.error("Erro ao mostrar os Livros: ", error);
            res.status(500).json({ erro: "Erro interno do servidor ao mostrar Livros." });
        }
    },

    cadastrarLivros: async (req, res) => {
        try {
            const { titulo, anoPublicacao, quantExemplares, nomeAutor } = req.body;

            if (titulo == undefined || titulo.trim() == "" || anoPublicacao == undefined || anoPublicacao.trim() == "" || nomeAutor == undefined || nomeAutor.trim() == "" || quantExemplares == undefined || quantExemplares.trim() == "") {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
            }

            await livrosModel.adicionarLivros(titulo, anoPublicacao, quantExemplares, nomeAutor);

            res.status(200).json({message: "Livro cadastrado com sucesso!"});

        } catch (error) {
            console.error("Erro ao cadastrar o livro: ", error);
            res.status(500).json({ erro: "Erro interno do servidor ao cadastrar livro." });
        }
    },

    deletarLivros: async (req, res) => {
        try {
            const { idLivro } = req.params;

            if (idLivro.length != 36) {
                return res.status(400).json({ erro: "Id do livro inválido!" });
            };

            const livro = await livrosModel.buscarID(idLivro);

            if (!livro || livro.length !== 1) {
                return res.status(404).json({ erro: "Livro não encontrado!" })
            };

            await livrosModel.removerLivro(idLivro);

            res.status(200).json({ message: "Sucesso ao deletar o livro!" });

        } catch (error) {
            console.error("Erro ao deletar livro: ", error);
            res.status(500).json({ erro: "Erro interno no servidor ao deletar livro!" });
        }
    }
};

module.exports = { livrosController };