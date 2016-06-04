const {
  SIGN_UP,
  LOG_IN,
} = require('../config').default;

import axios from 'axios';

const ROOT_URL = 'localhost:3000';

export function signUp(email, password, userid) {
  console.log('signUp is called');
  const url = `${ROOT_URL}/api/v1/singup`;
  const userObj = {
    email: email,
    password: password,
    userid: userid,
    token: '0'
  };
  const request = axios.post(url, userObj);
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
  const request = axios.post(url, userObj);
  return {
    type: LOG_IN,
    payload: request
  };
}
