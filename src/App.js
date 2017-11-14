import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchJsonp from 'fetch-jsonp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    }
  }

  componentWillMount() {
    const existingToken = sessionStorage.getItem('token');
    if (!accessToken && !existingToken) {
      window.location.replace('https://www.instagram.com/oauth/authorize/?client_id=e80738afb2c44cb08b8b2f60a6748221&redirect_uri=http://localhost:3000/test&response_type=token')
    }

    const accessToken = window.location.hash.split("=")[1]
    if (accessToken) {
      console.log(`New access token: ${accessToken}`);
      sessionStorage.setItem("token", accessToken);
      this.setState({
        token: accessToken
      });
    }
  }

  changeDate() {
    fetchJsonp(`https://api.instagram.com/v1/users/self/media/recent?access_token=${this.state.token}`)
      .then((data) => {
        return data.json();
      }).then((json) => {
        console.log(json);
      });

    this.setState({
      date: new Date().toString()
    });
  }

  render() {
    return (
      <div className="App">
        <h2>{this.props.title}</h2>
        <h2>{this.state.date}</h2>
        <button onClick={this.changeDate.bind(this)}>Update</button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
