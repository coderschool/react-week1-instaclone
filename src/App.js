import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    }
  }

  changeDate() {
    this.setState({
      date: new Date().toString()
    });
  }

  render() {
    console.log(new Date().toString());
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
