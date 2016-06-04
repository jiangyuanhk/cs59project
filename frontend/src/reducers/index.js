import { combineReducers } from 'redux';
import tweets from './tweetReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  tweets,
  user
});

export default rootReducer;
