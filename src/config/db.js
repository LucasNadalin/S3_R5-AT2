const { get } = require("http");
const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456789",
    server: "localhost",
    database: "BibliotecaNadalin",
    options: {
        encrypt: true,
        trustServerCertificate: true

    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(config);

        return pool
        
    } catch (error) {
        console.error('Erro na conexão SQL Server: ', error)
    }
};

module.exports = {sql, getConnection};