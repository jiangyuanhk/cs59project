import React, { Component } from 'react';
import { connect } from 'react-redux';

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

function mapStateToProps({ tweets }) {
  return { tweets };
}

export default connect(mapStateToProps)(TweetList);
