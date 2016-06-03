import { combineReducers } from 'redux';
import tweets from './reducer_tweets';
import user from './reducer_user';

const rootReducer = combineReducers({
  tweets,
  user
});

export default rootReducer;
