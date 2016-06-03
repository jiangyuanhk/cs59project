import React, {
  Component
} from 'react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login = (e) => {
    console.log('login is called');
    // e.preventDefault();
    // AuthService.login(this.state);
  }

  onInputEmail = (event) => {
    console.log(event.target.value);
    this.setState({email: event.target.value});
  }

  onInputPassword = (event) => {
    console.log(event.target.value);
    this.setState({password: event.target.value});
  }

  render () {
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.onInputEmail}
            required autofocus/>
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
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
