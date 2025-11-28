const {sql, getConnection} = require("../config/db");

const emprestimosModel = {
    buscarEmprestimos: async () => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Emprestimos"

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar emprestimos: ", error);
            throw error;
        }
    }
};

module.exports = {emprestimosModel};