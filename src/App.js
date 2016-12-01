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
      shortenedUrl: "",
      clicks: "",
      storedUrls: "",
      date: "",
      sortUrl: [],
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

updateShortenedUrl(e) {
  const shortenedUrlInput = e.target.value;
  this.setState({ shortenedUrl: shortenedUrlInput });
}

render() {
  const { url, shortenedUrl, storedUrls, sortByDate, sortByPopularity, sortUrl } = this.state;
  return (
    <div className="App">
      <form>
        <label><h1>Title</h1></label>
          <input type="text"
                 value={url}
                 onChange={ e => this.updateUrl(e) }/>
          <input type="text"
                 value={shortenedUrl}
                 onChange={ e => this.updateShortenedUrl(e) } />
          <label><h1>Website</h1></label>
        <input type="button" onClick={ () => this.post()}  />
      </form>
      <button onClick={() => this.sortUrlAsc()}>Date Ascend </button>
      <button onClick={() => this.sortUrlDesc()}>Date Descend </button>
      <button onClick={() => this.sortClicksAsc()}>Most Clicks</button>
      <button onClick={() => this.sortClicksDesc()}>Least Clicks</button>
      <ul>
        {/* {storedUrls ? this.sort() : null} */}
          { sortUrl ?
            sortUrl.map((website, index) => {
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
