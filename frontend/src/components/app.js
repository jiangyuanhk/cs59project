import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { Map } from 'immutable';

import Login from './Login';
import Tweet from './Tweet_list';
import TweetBar from './Tweet_bar';
import SignUp from './Signup';
import Header from './Header';

class App extends Component {
  render() {
    if (this.props.user) {
      console.log("user is:" + this.props.user);
      return (
        <div>
          <Header/>
          <TweetBar/>
          <Tweet/>
        </div>
      );
    }
    return <SignUp/>;
  }
}

//bipolate
function mapStateToProps(state) {
  return {...state};
}

// const actions = [
// ];
//
// function mapDispatchToProps(dispatch) {
//   const creators = Map()
//   .merge(...actions)
//   .filter(value => typeof value === 'function')
//   .toObject();
//
//   return {
//     actions: bindActionCreators(creators, dispatch),
//     dispatch
//   };
// }

export default connect(mapStateToProps)(App);
