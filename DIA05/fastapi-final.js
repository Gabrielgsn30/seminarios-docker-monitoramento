import http from 'k6/http';
import { sleep } from 'k6';
import {chai, describe, expect} from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { check } from 'k6';
import {Httpx} from 'https://jslib.k6.io/httpx/0.0.6/index.js';


const docs = () => {
  describe('/docs', () => {
      let response = http.get('http://0.0.0.0:8000/docs');
      check(response, {
          'is status 200': (r) => response.status === 200,
      });
  });
}

const GetAllUsers = () => {
  describe('Get All users', () => {
      let response = http.get('http://0.0.0.0:8000/api/v1/usuarios/');
      check(response, {
          'is status 200': (r) => response.status === 200,
      });
  });
}


const LoginUser = () => {
  function createAlertManagerData(description){
    const alert_manager_data = JSON.stringify([{
        labels: {
            "alertname":"Smoke Test - API",
            "severity": "High"
        },
        annotations: {
            "summary": description
        },
    }]);
    return alert_manager_data
  }
  
  var alert_manager_url = 'http://172.24.0.1:9094'
  let alert_manager_session = new Httpx({
      baseURL: alert_manager_url,
      headers: {
          'accept': 'application/json',
      },
  })

  describe('Login User', () => {
    const payload = {
      grant_type: '',
      username: 'gabriel@example.com',
      password: 'gabriel',
      scope: '',
      client_id: '',
      client_secret: '',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    };
      let response = http.post('http://0.0.0.0:8000/api/v1/usuarios/logindsfds',payload,{headers});
      check(response, {
          'is status 200': (r) => {
            if (response.status != 200){
              alert_manager_session.post("/api/v1/alerts", createAlertManagerData(`Login User check error`))
            }
      }});
  });
}

const CreateUser = () => {
  describe('Create User', () => {
    const payload = {
      id: 1,
      nome: 'Gabriel',
      sobrenome: 'Silva Nascimento',
      email: 'gabriel@example.com',
      eh_admin: true,
      senha: 'gabriel',
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };


      let response = http.put('http://0.0.0.0:8000/api/v1/usuarios/1',JSON.stringify(payload),{headers});
      check(response, {
          'is status 202': (r) => response.status === 202,
      });
  });
}

const EditUser = () => {
  describe('Edit User', () => {
    const payload = {
      id: 1,
      nome: 'Gabriel',
      sobrenome: 'Silva Nascimento',
      email: 'gabriel@example.com',
      eh_admin: true,
      senha: 'gabriel',
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };


      let response = http.put('http://0.0.0.0:8000/api/v1/usuarios/1',JSON.stringify(payload),{headers});
      check(response, {
          'is status 202': (r) => response.status === 202,
      });
  });
}

export default function () {
  // Fazer uma requisição GET para o endpoint
  [   docs,GetAllUsers,LoginUser,EditUser
].forEach(f => {
        f();
        sleep(5)
})
}