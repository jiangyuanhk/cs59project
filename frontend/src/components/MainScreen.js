import React, { Component } from 'react'
import TweetBar from './Tweet_bar';
import TweetList from './Tweet_list';
import Header from './Header';

class MainScreen extends Component {
  render () {
    return (
      <div>
        <Header/>
        <TweetBar/>
        <TweetList/>
      </div>
    );
  }
}

export default MainScreen;
