import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      url: "",
      shortenedUrl: "",
      clicks: "",
      storedUrls: ""
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
      clicks: this.state.clicks
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
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
          <input type="button" onClick={ () => this.post()} />
        </form>
        <div>
          { storedUrls ?
            storedUrls.map((website) => {
              return (
                <div key={website.id}>
                <h1>Url: {website.url}</h1>
                <h1> Shortened Url: { website.shortenedUrl }</h1>
                </div>
              )
            })
            :null }
        </div>
      </div>
    );
  }
}

export default App;
