const {
  SIGN_UP,
  LOG_IN,
  LOG_OUT,
} = require('../config').default;

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
    case SIGN_UP:
      console.log('received is:');
      console.log(action.payload);
      return action.error ? null : action.payload.data;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
}
