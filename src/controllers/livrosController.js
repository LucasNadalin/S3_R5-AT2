const { livrosModel } = require("../models/livrosModel");

const livrosController = {
/**
 * Controlador que lista todos os livros do banco de dados
 * @async
 * @function mostrarLivros
 * @param {object} req - Objeto da requisição (recebido do cliente HTTP) 
 * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
 * @returns {Promise<void>} Retorna uma reposta JSON com a lista de livros.
 * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os livros.
 *  
 */
    mostrarLivros: async (req, res) => {
        try {
            const livros = await livrosModel.buscarLivros();

            res.status(200).json(livros);

        } catch (error) {
            console.error("Erro ao mostrar os Livros: ", error);
            res.status(500).json({ erro: "Erro interno do servidor ao mostrar Livros." });
        }
    },

    /**
     * Controlador que cria um novo livro no banco de dados
     * 
     * @async
     * @function cadastrarLivros
     * @param {object} req - Objeto da requisição (recebido do cliente HTTP) 
     * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna uma mensagem de sucesso ou erro em formato JSON.
     * @throws {400} Se algum campo obrigatório não for preenchido corretamente.
     * @throws {500} Se ocorrer qualquer erro interno no servidor.
     */
    cadastrarLivros: async (req, res) => {
        try {
            const { titulo, anoPublicacao, quantExemplares, nomeAutor } = req.body;

            if (titulo == undefined || titulo.trim() == "" || anoPublicacao == undefined || anoPublicacao.trim() == "" || nomeAutor == undefined || nomeAutor.trim() == "" || quantExemplares == undefined || quantExemplares.trim() == "") {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
            }

            await livrosModel.adicionarLivros(titulo, anoPublicacao, quantExemplares, nomeAutor);

            res.status(200).json({ message: "Livro cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar o livro: ", error);
            res.status(500).json({ erro: "Erro interno do servidor ao cadastrar livro." });
        }
    }
};

module.exports = { livrosController };