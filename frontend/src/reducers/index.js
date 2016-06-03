import { combineReducers } from 'redux';
import tweets from './reducer_tweets';


const rootReducer = combineReducers({
  tweets,
});

export default rootReducer;
