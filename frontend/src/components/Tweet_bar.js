import React, { PropTypes } from 'react'

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
    // TODO: submit the tweet to the backend, and then fetch the new all tweets
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

export default TweetBar;
