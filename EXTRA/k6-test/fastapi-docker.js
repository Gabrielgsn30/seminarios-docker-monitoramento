import http from 'k6/http';
import { sleep } from 'k6';
import {chai, describe, expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { check } from 'k6';



const docs = () => {
  describe('/docs', () => {
      let response = http.get('http://fast-api:8000/docs');
      check(response, {
          'is status 200': (r) => response.status === 200,
      });
  });
}

const GetAllUsers = () => {
  describe('Get All users', () => {
      let response = http.get('http://fast-api:8000/api/v1/usuarios/');
      check(response, {
          'is status 200': (r) => response.status === 200,
      });
  });
}

export default function () {
  // Fazer uma requisição GET para o endpoint
  [   docs,GetAllUsers
].forEach(f => {
        f();
        sleep(5)
})
}