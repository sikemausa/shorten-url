import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "2",
      url: 'http://www.dirtymike.com',
    }
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

  render() {
    return (
      <div className="App">
        <form>
          <label>
            <input type="text" />
          </label>
          <input type="button" onClick={ () => this.post()} />
        </form>
      </div>
    );
  }
}

export default App;
