import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  // Fazer uma requisição GET para o endpoint
  const response = http.get('http://fast-api:8000/docs');

  // Verificar o status da resposta
  if (response.status === 200) {
    console.log('Endpoint /docs está funcionando corretamente!');
  } else {
    console.log('Falha no teste de fumaça. O endpoint retornou um status diferente de 200.');
  }

  // Esperar por um curto período antes de fazer a próxima requisição
  sleep(1);
}