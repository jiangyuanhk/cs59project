import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { push } from 'react-router-redux';

import * as userActions from '../reducers/userActions';

class Header extends React.Component {

  onLogOutClick = () => {
    this.props.actions.logout();
    this.props.dispatch(push('/login'));
  }

  render () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <text>{`Welcome! ${this.props.user.userid}`}</text>
          <button
            type="button"
            onClick={this.onLogOutClick}
            className="btn btn-default navbar-btn">Log out</button>
        </div>
      </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
