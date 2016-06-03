import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import Login from './Login';
import Tweet from './Tweet_list';
import TweetBar from './Tweet_bar';
import SignUp from './Signup';

class App extends Component {
  render() {
    if (this.props.user) {
      return (
          <Tweet/>
      );
    }
    return <SignUp/>;
  }
}

//bipolate
function mapStateToProps(state) {
  return {...state};
}

const actions = [
];

function mapDispatchToProps(dispatch) {
  const creators = Map()
  .merge(...actions)
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
