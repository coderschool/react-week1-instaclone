import React, { Component } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import InstaList from './components/InstaList.js';
import InstaBar from './components/InstaBar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ""
    }
  }

  componentWillMount() {
    const existingToken = sessionStorage.getItem('token');
    const accessToken = window.location.hash.split("=")[1]

    if (!accessToken && !existingToken) {
      window.location.replace('https://www.instagram.com/oauth/authorize/?client_id=e80738afb2c44cb08b8b2f60a6748221&redirect_uri=http://localhost:3000/test&response_type=token')
    }

    if (accessToken) {
      console.log(`New access token: ${accessToken}`);
      sessionStorage.setItem("token", accessToken);
      this.setState({
        token: accessToken
      });
    }
  }

  componentDidMount(){
    this.loadData.bind(this)();
  }

  loadData() {
    this.setState({
      loading: true
    });
    fetchJsonp(`https://api.instagram.com/v1/users/self/media/recent?access_token=${this.state.token}`)
      .then((data) => {
        return data.json();
      }).then((json) => {
        this.setState({
          date: new Date().toString()
        });        
        this.setState({
          posts: json,
          loading: false
        })
      });
  }

  render() {
    return (
      <div className="App">
        <InstaBar date={this.state.date}/>
        <InstaList posts={this.state.posts} loading={this.state.loading}/>
      </div>
    );
  }
}

export default App;
