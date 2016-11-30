import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      url: "",
      shortenedUrl: "",
      clicks: "",
      storedUrls: "",
      date: ""
    };
  }

componentDidMount() {
  this.get();
}

post(){
  axios.post(`/urls`, {
      id: this.state.id,
      url: this.state.url,
      shortenedUrl: this.state.shortenedUrl,
      clicks: this.state.clicks,
      date: Date.now(),
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  this.get();
}

get(){
  axios.get(`/urls`).then((response) => {
      console.log(response);
      this.setState({ storedUrls: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
}

updateUrl(e) {
  const urlInput = e.target.value;
  this.setState({ url: urlInput });
}

updateShortenedUrl(e) {
  const shortenedUrlInput = e.target.value;
  this.setState({ shortenedUrl: shortenedUrlInput });
}

  render() {
    const { id, url, shortenedUrl, storedUrls } = this.state;
    return (
      <div className="App">
        <form>
          <label>
            <input type="text"
                   value={url}
                   onChange={ e => this.updateUrl(e) }/>
            <input type="text"
                   value={shortenedUrl}
                   onChange= { e => this.updateShortenedUrl(e) } />
          </label>
          <input type="button" onClick={ () => this.post()}  />
        </form>
        <ul>
          { storedUrls ?
            storedUrls.map((website) => {
              return (
                <li key={website.id}>
                  <p>Url: {website.url}</p>
                  <p>Shortened Url: <a href={website.shortenedUrl}>{'http://' + website.shortenedUrl}</a></p>
                  <p>Clicks: {website.clicks}</p>
                  <p>Date: {moment(website.date).format("MMM Do YY")}</p>
                </li>
              )
            })
            :null }
        </ul>
      </div>
    );
  }
}

export default App;
