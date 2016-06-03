import React, { Component } from 'react';
import Login from './Login';
import Tweet from './Tweet_list';
import TweetBar from './Tweet_bar';

export default class App extends Component {
  render() {
    return (
      <div>
        <TweetBar/>
        <Tweet/>
      </div>
    );
  }
}
