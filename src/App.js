import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import md5 from 'md5';
import Website from './Website';
import { orderBy } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      url: "",
      clicks: "",
      date: "",
      storedUrls: "",
      sortUrl: [],
      baseUrl: 'http://localhost:3001/urls/'
    };
  }

componentDidMount() {
  this.get();
}

post(){
  axios.post(`/urls`, {
    id: md5(this.state.url),
    url: this.state.url,
    shortenedUrl: this.state.shortenedUrl,
    clicks: this.state.clicks,
    date: Date.now(),
  })
  .then(function (response) {
    console.log('Axios Post Request: ' + response);
  })
  .catch(function (error) {
    console.log(error);
  });
  this.get();
  this.setState({url: ''});
}

get(){
  axios.get(`/urls`).then((response) => {
    console.log(response);
    this.setState({ storedUrls: response.data, sortUrl: response.data});
  })
  .catch(function (error) {
    console.log(error);
  });
}

sortUrlAsc() {
  let urlAscending = orderBy(this.state.storedUrls, ['date'], ['asc']);
  this.setState({sortUrl: urlAscending});
}

sortUrlDesc() {
  let urlDescending = orderBy(this.state.storedUrls, ['date'], ['desc']);
  this.setState({sortUrl: urlDescending});
}

sortClicksAsc() {
  let urlAscending = orderBy(this.state.storedUrls, ['clicks'], ['asc']);
  this.setState({sortUrl: urlAscending});
}

sortClicksDesc() {
  let urlDescending = orderBy(this.state.storedUrls, ['clicks'], ['desc']);
  this.setState({sortUrl: urlDescending});
}

updateUrl(e) {
  const urlInput = e.target.value;
  this.setState({ url: urlInput });
}

render() {
  const { url, shortenedUrl, storedUrls, sortByDate, sortByPopularity, sortUrl } = this.state;
  return (
    <div className="App">
      <section className="top-page">
        <h1>URL Shortener</h1>
        <form>
          <label>
            Enter URL Here
          </label>
          <input type="text" value={url} onChange={ e => this.updateUrl(e) }
            className=""
          placeholder="http://www.YOURSITEHERE.com"/>
          <button onClick={ (e) => { e.preventDefault(); this.post();}}
            disabled={!url}>Submit URL</button>
        </form>
        <h2>Shortened URLs</h2>
        <nav>
          <button onClick={() => this.sortUrlAsc()}>Date Ascend</button>
          <button onClick={() => this.sortUrlDesc()}>Date Descend</button>
          <button onClick={() => this.sortClicksAsc()}>Least Clicks</button>
          <button onClick={() => this.sortClicksDesc()}>Most Clicks</button>
        </nav>
      </section>
      <section className="bottom-page">
        <ul>
          { sortUrl ?
            sortUrl.map((website, index) => {
              return (
                <Website key={index} website={website} baseUrl={this.state.baseUrl}/>
              )
            })
            :null }
        </ul>
      </section>
    </div>
    );
  }
}

export default App;
