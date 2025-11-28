const express = require("express");
const app = express();
const { livrosRoutes } = require("./src/routes/livrosRoutes");
const PORT = 8082;

app.use(express.json());

app.use("/", livrosRoutes);

app.listen(PORT, () => {
    console.log(`Rodando o servidor em http://localhost:${PORT}`);
});