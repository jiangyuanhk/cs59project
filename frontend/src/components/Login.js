import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import * as userActions from '../reducers/userActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userid: ''
    };
  }

  onInputEmail = (event) => {
    // console.log(event.target.value);
    this.setState({email: event.target.value});
  }

  onInputPassword = (event) => {
    // console.log(event.target.value);
    this.setState({password: event.target.value});
  }

  onInputUserID = (event) => {
    // console.log(event.target.value);
    this.setState({userid: event.target.value});
  }

  onFormSubmit = (event) => {
    console.log("onFormSubmit is called");
    event.preventDefault();
    this.props.actions.login(
      this.state.email,
      this.state.password,
      this.state.userid
    );
  }

  render () {
    return (
      <div className="container">
        <form
          className="form-signin"
          onSubmit={this.onFormSubmit}>
          <h2 className="form-signin-heading">Please Log in</h2>
          <input
            type="text"
            id="inputUserId"
            className="form-control"
            placeholder="User ID"
            value={this.state.userid}
            onChange={this.onInputUserID}
            required autofocus/>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.onInputEmail}
            required/>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onInputPassword}
            required/>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit">
            Log in
          </button>
        </form>
      </div>
    );
  }
}

//bipolate
function mapStateToProps(state) {
  return {...state};
}

const actions = [
  userActions
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
