const {
  SIGN_UP,
  LOG_IN,
} = require('../config').default;

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
    case SIGN_UP:
      console.log("recevied:" + action.payload);
      return action.error ? null : action.payload;
    default:
      return state;
  }
}
