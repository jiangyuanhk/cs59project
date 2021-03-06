const {
  POST_TWEET,
  GET_ALL_TWEETS,
} = require('../config').default;

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_TWEET:
      return state;
    case GET_ALL_TWEETS:
      console.log('received is:');
      console.log(action.payload);
      console.log('error is:');
      console.log(action.error);
      return action.error ? null : action.payload.data.tweets;
    default:
      return state;
  }
}
