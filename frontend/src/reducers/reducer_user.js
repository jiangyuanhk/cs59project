import {
  LOG_IN,
  SIGN_UP
} from '../actions/index';

const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
    case SIGN_UP:
      return action.payload;
    default:
      return state;
  }
}
