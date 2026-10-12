const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração da conexão com o banco (usando o nome do serviço do docker-compose)
const pool = new Pool({
  host: 'banco-db',
  user: 'admin',
  password: 'secret',
  database: 'escola_db',
  port: 5432,
});

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// Rota da API para retornar os alunos em formato JSON
app.get('/api/alunos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alunos ORDER BY id ASC');
    res.json(resultado.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao consultar o banco de dados');
  }
});

app.listen(port, () => {
  console.log(`Servidor web rodando na porta ${port}`);
});