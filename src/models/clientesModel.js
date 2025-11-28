const { sql, getConnection } = require("../config/db");

const clientesModel = {
    buscarClientes: async () => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Clientes"

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar clientes: ", error);
            throw error;
        }
    },

    buscarID: async (idCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `
            SELECT * FROM Clientes
            WHERE idCliente = @idCliente
            `;

            const result = await pool.request()
                .input("idCliente", sql.Char, idCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar o cliente: ", error);
            throw error;
        }
    },

    buscarEmail: async (email) => {
        try {
            const pool = await getConnection();
            const querySQL = `
            SELECT * FROM Clientes
            WHERE email = @email
          `;

            const result = await pool.request()
                .input("email", sql.Char, email)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar o email: ", error);
            throw error;
        }
    },

    adicionarClientes: async (nomeCliente, email, senha) => {
        try {
            const pool = await getConnection();

            const querySQL = `
            INSERT INTO Clientes (nomeCliente, email, senha)
            VALUES(@nomeCliente, @email, @senha)
            `

            await pool.request()
                .input("nomeCliente", sql.VarChar(200), nomeCliente)
                .input("email", sql.VarChar(200), email)
                .input("senha", sql.VarChar(100), senha)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao adicionar cliente: ", error);
            throw error;
        }
    },

    removerClientes: async (idCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                DELETE FROM Clientes
                WHERE idCliente = @idCliente
            `;

            await pool.request()
            .input("idCliente", sql.UniqueIdentifier, idCliente)
            .query(querySQL)
            
        } catch (error) {
            console.error("Erro ao deletar o cliente: ", error);
            throw error;
        }
    }
};

module.exports = { clientesModel };