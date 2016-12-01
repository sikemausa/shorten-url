import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

class Website extends Component {

  render() {
    return (
      <li key={this.props.website.id}>
        <p>Url: {this.props.website.url}</p>
        <p>Shortened Url: <a onClick={() => this.incrementClicks()} href={'http://localhost:3001/urls/' + this.props.website.shortenedUrl}> {'http://localhost:3001/urls/' + this.props.website.shortenedUrl}</a></p>
        <p>Clicks: {this.props.website.clicks}</p>
        <p>Date: {moment(this.props.website.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
      </li>
    )
  }
}

export default Website;
