import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';
import md5 from 'md5';
import Website from './Website';

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
//
// incrementClicks(){
//   axios.patch(`/urls`, {
//       clicks: this.state.clicks,
//   }).then((response) => {
//       console.log(response);
//       this.setState({ storedUrls: response.data });
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

post(){
  axios.post(`/urls`, {
      id: md5(this.state.url),
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
            storedUrls.map((website, index) => {
              return (
                <Website key={index} website={website}/>
              )
            })
            :null }
        </ul>
      </div>
    );
  }
}

export default App;
