const express = require("express");
const app = express();
const { clientesRoutes } = require("./src/routes/clientesRoutes");
const { emprestimosRoutes } = require("./src/routes/emprestimosRoute");
const { livrosRoutes } = require("./src/routes/livrosRoutes");
const PORT = 8082;

app.use(express.json());

app.use("/", clientesRoutes);

app.use("/", emprestimosRoutes);

app.use("/", livrosRoutes);

app.listen(PORT, () => {
    console.log(`Rodando o servidor em http://localhost:${PORT}`);
});