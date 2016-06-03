import React, {
  Component
} from 'react'

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      alertText: ''
    };
  }

  onInputEmail = (event) => {
    console.log(event.target.value);
    this.setState({email: event.target.value});
  }

  onInputPassword = (event) => {
    console.log(event.target.value);
    this.setState({password: event.target.value});
  }

  onInputConfirmPassword = (event) => {
    console.log(event.target.value);
    this.setState({confirmPassword: event.target.value});
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
    //TODO: if the same, submit to the server
  }

  render () {
    return (
      <div className="container">
        <form
          className="form-signin"
          onSubmit={this.onFormSubmit}>
          <h2 className="form-signin-heading">Please sign up</h2>
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

export default SignUp;
