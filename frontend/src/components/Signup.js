import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import * as userActions from '../reducers/userActions';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      email: '',
      password: '',
      confirmPassword: '',
      alertText: ''
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

  onInputConfirmPassword = (event) => {
    // console.log(event.target.value);
    this.setState({confirmPassword: event.target.value});
  }

  onInputUserID = (event) => {
    // console.log(event.target.value);
    this.setState({userid: event.target.value});
  }

  onFormSubmit = (event) => {
    console.log("onFormSubmit is called");
    event.preventDefault();
    //check to see if confirmPassword == password
    if (this.state.password !== this.state.confirmPassword) {
      console.log('enter here');
      this.setState({alertText: 'confirm Password and Password is not the same !'});
      return;
    };

    this.props.actions.signUp(
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
          <h2 className="form-signin-heading">Please sign up</h2>
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
          <input
            type="password"
            id="inputConfirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.onInputConfirmPassword}
            required/>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit">
            Sign Up
          </button>
          <text>{this.state.alertText}</text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
