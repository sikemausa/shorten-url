import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      url: "",
    };
  }

post(){
  axios.post(`/urls`, {
      id: this.state.id,
      url: this.state.url
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

updateUrl(e) {
  const urlInput = e.target.value;
  this.setState({ url: urlInput });
}

  render() {
    const { id, url } = this.state;
    return (
      <div className="App">
        <form>
          <label>
            <input type="text"
                   value={url}
                   onChange={ (e) => this.updateUrl(e) }/>
          </label>
          <input type="button" onClick={ () => this.post()} />
        </form>
      </div>
    );
  }
}

export default App;
