const {
  SIGN_UP,
  LOG_IN,
  LOG_OUT,
} = require('../config').default;

import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function signUp(email, password, userid) {
  console.log('signUp is called');
  const url = `${ROOT_URL}/api/v1/signup`;
  const userObj = {
    email: email,
    password: password,
    userid: userid,
    token: '0'
  };
  const request = axios({
    method: 'post',
    url: url,
    data: userObj
  });
  console.log(request);
  return {
    type: SIGN_UP,
    payload: request
  };
}

export function login(email, password, userid) {
  const url = `${ROOT_URL}/api/v1/login`;
  const userObj = {
    email: email,
    password: password,
    userid: userid,
    token: '0'
  };
  const request = axios({
    method: 'post',
    url: url,
    data: userObj
  });
  return {
    type: LOG_IN,
    payload: request
  };
}

export function logout() {
  return {
    type: LOG_OUT
  }
}
