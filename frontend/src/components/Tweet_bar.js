import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import * as tweetActions from '../reducers/tweetActions';

class TweetBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ content: event.target.value });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.actions.postTweet(
      this.props.user.userid,
      this.props.user.token,
      this.state.content
    );
    this.props.actions.getAllTweets();
    this.setState({ content: '' });
  }

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
        className="input-group">
        <input
          placeholder="write a tweet today !"
          className="form-control"
          value={this.state.content}
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}

//bipolate
function mapStateToProps(state) {
  return {...state};
}

const actions = [
  tweetActions
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

export default connect(mapStateToProps, mapDispatchToProps)(TweetBar);
