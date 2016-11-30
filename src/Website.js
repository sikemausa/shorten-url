import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';
const md5 = require('md5');

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
                  <p>Shortened Url: {this.props.website.shortenedUrl}</p>
                  <p>Clicks: {this.state.clicks}</p>
                  <p>Date: {moment(this.props.website.date).format("MMM Do YY")}</p>
                </li>
              )
  }
}

export default Website;
