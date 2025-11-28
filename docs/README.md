## API Reference

### Livros

#### GET /livros
- **Descrição**: Obtém uma lista de livros
- **Response**: Array de livros
- **Parameters**: Busca um unico livro pelo idLivro
```
/livros?idLivro=123
```
- **Error Response (400)**: Caso o id não esteja em formato UUID
```
{ 
    erro: "Id do livro inválido!" 
}
```

#### POST /livros
- **Descrição**: Cria um novo livro
- **Body**:
```
{
    "titulo": "tituloExemplo",
    "anoPublicacao": 1920,
    "quantExemplares": 1,
    "nomeAutor": "nomeExemplo"
}
```
- **Response**:
```
{
    "mensagem": "Livro cadastrado com sucesso!"
}
```
- **Error Response (400)**: Caso os campos obrigatórios não estejam preenchidos:
```
{ 
    erro: "Campos Obrigatórios Não preenchidos" 
}
```