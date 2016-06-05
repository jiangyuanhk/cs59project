import { combineReducers } from 'redux';
import tweets from './tweetReducer';
import user from './userReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  tweets,
  user,
  routing: routerReducer
});

export default rootReducer;
