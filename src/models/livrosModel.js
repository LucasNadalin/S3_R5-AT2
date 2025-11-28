const {sql, getConnection} = require("../config/db");

const livrosModel = {
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
    },

    removerLivro: async (idLivro) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            DELETE FROM Livros
            WHERE idLivro = @idLivro
            `;

            await pool.request()
            .input("idLivro", sql.UniqueIdentifier, idLivro)
            .query(querySQL)

        } catch (error) {
            console.error("Erro ao deletar o livro: ", error);
            throw error;   
        }
    }
};

module.exports = {livrosModel};