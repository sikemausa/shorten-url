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

        <p>Url: {this.props.website.url}</p>
        <p>Shortened Url: <a href={this.props.website.url}> {'http://' + this.props.website.shortenedUrl}</a></p>
        <p>Clicks: {this.props.website.clicks || 0}</p>
        <p>Date: {moment(this.props.website.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
      </li>
    )
  }
}

export default Website;
