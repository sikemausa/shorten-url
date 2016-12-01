import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

class Website extends Component {
  constructor() {
    super();
    this.state = {
      clicks: 0
    };
  }

  incrementClicks() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  render() {
    const { clicks } = this.state;
    return (
      <li key={this.props.website.id}>
        <p onClick={() => this.incrementClicks() }>Url: {this.props.website.url}</p>
        <p>Shortened Url: <a href={this.props.website.url}> {'http://' + this.props.website.shortenedUrl}</a></p>
        <p>Clicks: {clicks}</p>
        <p>Date: {moment(this.props.website.date).format("MMM Do YY")}</p>
      </li>
    )
  }
}

export default Website;
