import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

class TweetList extends Component {
  renderTweet(tweet) {
    return (
      <tr key={tweet.userid}>
        <td>{tweet.userid}</td>
        <td>{tweet.content}</td>
        <td>{tweet.added}</td>
      </tr>
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>user_id</th>
            <th>content</th>
            <th>added</th>
          </tr>
        </thead>
        <tbody>
          {this.props.tweets.map(this.renderTweet)}
        </tbody>
      </table>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
