const {
  POST_TWEET,
  GET_ALL_TWEETS,
} = require('../config').default;

import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function postTweet(userid, token, content) {
  const url = `${ROOT_URL}/api/v1/p`;
  const tweetObj = {
    userid: userid,
    token: token,
    content: content,
    added: '2013-10-17T09:42:49.007Z'
  };
  const request = axios({
    method: 'post',
    url: url,
    data: tweetObj
  });
  return {
    type: POST_TWEET,
    payload: request
  };
}

export function getAllTweets() {
  const url = `${ROOT_URL}/api/v1/display`;
  const request = axios({
    method: 'get',
    url: url
  });
  return {
    type: GET_ALL_TWEETS,
    payload: request
  };
}
