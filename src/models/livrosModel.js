const { sql, getConnection } = require("../config/db");

const livrosModel = {

    /**
     * Busca todos os livros no banco de dados
     * 
     * @async
     * @function buscarLivros
     * @returns {Promise<Array>} Retorna uma lista com todos os livros.
     * @throws mostra no console e propaga o erro caso a busca falhe.
     * 
     */
    buscarLivros: async () => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Livros"

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar livros: ", error);
            throw error;
        }
    },


    /**
     * 
     * Busca apenas um livro no banco de dados
     * 
     * @async
     * @function buscarID
     * @param {string} idProduto - Id do livro em UUID no banco de dados.
     * @returns {Promise<Array>} - Retorna uma lista com um produto caso encontre no banco de dados.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     * 
     */
    buscarID: async (idLivro) => {
        try {
            const pool = await getConnection();
            const querySQL = `
            SELECT * FROM Livros
            WHERE idLivro = @idLivro
            `;

            const result = await pool.request()
                .input("idLivro", sql.Char, idLivro)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar o livro: ", error);
            throw error;
        }
    },

    /**
     * @async
     * @function adicionarLivros
     * @param {string} titulo 
     * @param {Int} anoPublicacao 
     * @param {Int} quantExemplares 
     * @param {string} nomeAutor 
     * @returns {Promise<void>} Não retorna nada, apenas executa a atualização.
     * @throws Mostra no console e propaga o erro caso a atualização falhe.
     */
    adicionarLivros: async (titulo, anoPublicacao, quantExemplares, nomeAutor) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            INSERT INTO Livros (titulo, anoPublicacao, quantExemplares, nomeAutor)
            VALUES(@titulo, @anoPublicacao, @quantExemplares, @nomeAutor)
            `

            await pool.request()
                .input("titulo", sql.VarChar(200), titulo)
                .input("anoPublicacao", sql.Int, anoPublicacao)
                .input("quantExemplares", sql.Int, quantExemplares)
                .input("nomeAutor", sql.VarChar(200), nomeAutor)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao adicionar livro: ", error);
            throw error;
        }
    }
}

module.exports = { livrosModel };