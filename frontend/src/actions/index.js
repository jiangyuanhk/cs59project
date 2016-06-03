export const LOG_IN = 'login';
export const SIGN_UP = 'singup';

export function SignUp(email, password) {
  const userObj = {
    email: email,
    password: password
  };
  return {
    type: SIGN_UP,
    payload: userObj
  };
}

export function Login(email, password) {
  const userObj = {
    email: email,
    password: password
  };
  return {
    type: LOG_IN,
    payload: userObj
  };
}
