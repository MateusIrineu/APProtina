const express = require('express')
// Importa o módulo express para criar o servidor
const dotenv = require('dotenv')
const app = express()
app.use(express.json()) // Middleware para interpretar JSON// Carrega as variáveis de ambiente do arquivo .env|| 3000 // Define a porta padrão como 3000 se PORTA não estiver definida
dotenv.config()

const port = process.env.PORTA 
const produtos = []

app.get('/produtos', (requisicao, resposta) => {
  try {
    if(produtos.length === 0) {
      return resposta.status(200).json({mensagem: "Banco de dados vazio"}) // JavaScript Object Notation
    }
    resposta.status(200).json(produtos)  
  } catch (error) {
    resposta.status(500).json({mensagem: "Erro ao buscar produtos", erro: error.message})
  }
app.post('/produtos', (requisicao, resposta) =>  {
    try {
      const { id, nome, preco } = requisicao.body
      const novoProduto = { id, nome, preco }
      const produtoExsite = produtos.some(produto => produto.id === id)
      if (produtoExsite) {
        return resposta.status(200).json({mensagem: "Produto já existe"})
      }
      produtos.push(novoProduto)
      resposta.status(201).json({mensagem: "Produto adicionado com sucesso", produto: novoProduto})
    } catch (error) {
      resposta.status(500).json({mensagem: "Erro ao adicionar produto", erro: error.message})       
    }
})
})

app.listen(port, () => {
  console.log(`Servidor em execução http://localhost:${port}`)
})
